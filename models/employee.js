const db=require('../utils/database').db

const employeeTable= `
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INT NOT NULL AUTO_INCREMENT ,
      employee_fullName VARCHAR(50) NOT NULL,
      job_title VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      address VARCHAR(60) NOT NULL,
      city VARCHAR(50) NOT NULL,
      state VARCHAR(50) NOT NULL,
      PRIMARY KEY(employee_id)
    )
  `;
  db.query(employeeTable, (err, result) => {
  if (err) {
    console.error('Error creating employees table: ', err);
    return;
  }
  else
  {
    console.log('Employees table created');
  }
})


//create the contact_details table
const primaryContactDetail=`
    CREATE TABLE IF NOT EXISTS primary_contact_details (
      employee_id INT PRIMARY KEY NOT NULL,
      primary_emergencyContact VARCHAR(50) NOT NULL,
      phoneNumber VARCHAR(50) NOT NULL,
      relationship VARCHAR(50) NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )
  `;
  db.query(primaryContactDetail, (err, result) => {
  if (err) {
    console.error('Error creating employees table: ', err);
    return;
  }
  else
  {
    console.log('primary conatct detail table created');
  }
  })
const secondaryContactDetail=`
    CREATE TABLE IF NOT EXISTS secondary_contact_details (
      employee_id INT PRIMARY KEY NOT NULL,
      secondary_emergencyContact VARCHAR(50) NOT NULL,
      phoneNumber VARCHAR(50) NOT NULL,
      relationship VARCHAR(50) NOT NULL, 
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )
  `;
  db.query(secondaryContactDetail, (err, result) => {
  if (err) {
    console.error('Error creating employees table: ', err);
    return;
  }
  else
  {
    console.log('Secondary contact detail table created');
  }
})
  

