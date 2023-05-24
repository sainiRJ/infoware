const Employees = require("../models/employee");
const db = require("../utils/database").db;

exports.getEmployee=(req,res,next)=>{
  res.render('/create')
}
exports.createEmployee = (req, res, next) => {
  const employeeData = {
    employee_id: req.body.employee_id,
    employee_fullName: req.body.name,
    job_title: req.body.department,
    email:req.body.email,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
  };
  const primaryContactDetail = {
    employee_id: req.body.employee_id,
    primary_emergencyContact: req.body.primary_emergencyContact,
    phoneNumber: req.body.phoneNumber,
    relationShip: req.body.relationShip
  };
  const secondaryContactDetail = {
    employee_id: req.body.employee_id,
    secondary_emergencyContact: req.body.secondary_emergencyContact,
    phoneNumber: req.body.phoneNumber,
    relationShip: req.body.relationShip
  };

  const employeeQuery = "INSERT INTO employees SET ?";
  db.query(employeeQuery, employeeData, (error, results, fields) => {
    if (error) throw error;
    const contactQuery = "INSERT INTO contact_details SET ?";
    db.query(contactQuery, primaryContactDetail,secondaryContactDetail, (error, results, fields) => {
      if (error) throw error;
      res.send("Data inserted successfully");
    });
  });
};

// Define a function to retrieve a paginated list of employees
exports.employeeList = (req, res, next) => {
  const page = req.params.page || 1; // default to first page
  const perPage = req.params.perPage || 10; // default to 10 employees per page
  const offset = (page - 1) * perPage;

  const query = `
    SELECT employees.*, 
           primary_contact.primary_emergencyContact AS primary_contact, 
           primary_contact.phoneNumber AS primary_phoneNumber,
           primary_contact.relationship AS primary_relationship,
           secondary_contact.secondary_emergencyContact AS secondary_contact,
           secondary_contact.phoneNumber AS secondary_phoneNumber,
           secondary_contact.relationship AS secondary_relationship
    FROM employees
    LEFT JOIN contact_details AS primary_contact ON employees.employee_id = primary_contact.employee_id
    LEFT JOIN contact_details AS secondary_contact ON employees.employee_id = secondary_contact.employee_id
    ORDER BY employees.employee_id
    LIMIT ${perPage} OFFSET ${offset};
  `;

  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error retrieving employee list:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
};


exports.readEmployeeData = (req, res, next) => {
  const employeeId = req.params.employee_id;
  const query = `
    SELECT employees.*, 
           primary_contact.primary_emergencyContact AS primary_contact, 
           primary_contact.phoneNumber AS primary_phoneNumber,
           primary_contact.relationship AS primary_relationship,
           secondary_contact.secondary_emergencyContact AS secondary_contact,
           secondary_contact.phoneNumber AS secondary_phoneNumber,
           secondary_contact.relationship AS secondary_relationship
    FROM employees
    LEFT JOIN contact_details AS primary_contact ON employees.employee_id = primary_contact.employee_id
    LEFT JOIN contact_details AS secondary_contact ON employees.employee_id = secondary_contact.employee_id
    WHERE employees.employee_id = ?`;

  db.query(query, [employeeId], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving employee data:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const employeeData = results[0];
    res.json(employeeData);
  });
};


exports.updateEmployeeData = (req, res, next) => {
  const employeeId = req.params.employee_id;
  const updatedEmployeeData = {
    employee_fullName: req.body.name,
    job_title: req.body.department,
    email:req.body.email,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
  };
  const updatedPrimaryContactDetail = {
    primary_emergencyContact: req.body.primaryContact,
    phoneNumber: req.body.primaryPhoneNumber,
    relationship: req.body.primaryRelationship,
  };
  const updatedSecondaryContactDetail = {
    secondary_emergencyContact: req.body.secondaryContact,
    phoneNumber: req.body.secondaryPhoneNumber,
    relationship: req.body.secondaryRelationship,
  };

  const employeeQuery = "UPDATE employees SET ? WHERE employee_id=?";
  db.query(
    employeeQuery,
    [updatedEmployeeData, employeeId],
    (error, employeeResults, fields) => {
      if (error) {
        console.error('Error updating employee data:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const primaryContactQuery = "UPDATE contact_details SET ? WHERE employee_id=?";
      db.query(
        primaryContactQuery,
        [updatedPrimaryContactDetail, employeeId],
        (error, primaryContactResults, fields) => {
          if (error) {
            console.error('Error updating primary contact details:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          const secondaryContactQuery = "UPDATE contact_details SET ? WHERE employee_id=?";
          db.query(
            secondaryContactQuery,
            [updatedSecondaryContactDetail, employeeId],
            (error, secondaryContactResults, fields) => {
              if (error) {
                console.error('Error updating secondary contact details:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }

              res.send("Data updated successfully");
            }
          );
        }
      );
    }
  );
};


exports.deleteEmployeesData = (req, res, next) => {
  const employeeId = req.params.employee_id;
  const deleteContactQuery =
    "DELETE FROM contact_details WHERE employee_id = ?";
  db.query(deleteContactQuery, employeeId, (error, results, fields) => {
    if (error) throw error;
    const deleteEmployeeQuery = "DELETE FROM employees WHERE employee_id = ?";
    db.query(deleteEmployeeQuery, employeeId, (error, results, fields) => {
      if (error) throw error;
      res.send(`Employee with ID ${employeeId} has been deleted successfully.`);
    });
  });
};
