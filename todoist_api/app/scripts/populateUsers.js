import db from "../models/db.js";

const users = [
  "Aarav Sharma",
  "Ishaan Verma",
  "Vivaan Joshi",
  "Kabir Mehta",
  "Aryan Singh",
  "Rohan Kapoor",
  "Advik Choudhary",
  "Reyansh Bhatia",
  "Shaurya Tandon",
  "Krish Malhotra",
  "Ayaan Sethi",
  "Neel Khanna",
  "Dev Patel",
  "Kiaan Desai",
  "Atharv Nair",
  "Pranav Saxena",
  "Harsh Rajput",
  "Rudra Ghosh",
  "Daksh Agrawal",
  "Ayush Bansal",
  "Arjun Sinha",
  "Anay Mukherjee",
  "Vedant Rao",
  "Samar Kaushik",
  "Yug Mathur",
  "Parth Trivedi",
  "Kushal Sharma",
  "Samarth Anand",
  "Tanmay Bajaj",
  "Manan Gupta",
  "Hridhaan Pillai",
  "Lakshya Kumar",
  "Eshan Kulkarni",
  "Shivansh Iyer",
  "Yuvan Menon",
  "Aaditya Reddy",
  "Bodhi Roy",
  "Darsh Naik",
  "Ivaan Goswami",
  "Kabir Dutta",
  "Neil Basu",
  "Omkar Mohan",
  "Pratyush Bhattacharya",
  "Rishaan Rao",
  "Siddharth Swamy",
  "Tanishq Nath",
  "Ujjwal Banerjee",
  "Veer Chaturvedi",
  "Zayan Sen",
  "Advay Bhardwaj",
  "Vihan Prasad",
  "Ronav Srivastava",
  "Shlok Thakur",
  "Anirudh Yadav",
  "Varun Mittal",
  "Kiaan Goel",
  "Devansh Chopra",
  "Nirvaan Arora",
  "Shreyas Jain",
  "Harshil Saxena",
  "Dhruv Sharma",
  "Reyansh Gupta",
  "Shaan Kapoor",
  "Hridaan Agarwal",
  "Aryaveer Rathi",
  "Keshav Shukla",
  "Arnav Chatterjee",
  "Anvit Deshmukh",
  "Aditya Rangan",
  "Krishiv Iyengar",
  "Shaurya Kulshreshtha",
  "Siddhanth Dubey",
  "Rudransh Sharma",
  "Shreyank Sehgal",
  "Vivik Jain",
  "Ayansh Bhardwaj",
  "Rudraksh Gupta",
  "Lakshay Taneja",
  "Pranay Chopra",
  "Chirag Khatri",
  "Yashwant Bhat",
  "Akhil Mahajan",
  "Tarun Bhasin",
  "Jatin Malhotra",
  "Sankalp Oberoi",
  "Rupesh Vaidya",
  "Arvind Tiwari",
  "Bharat Joshi",
  "Chetan Purohit",
  "Dinesh Shetty",
  "Eshwar Gokhale",
  "Farhan Qureshi",
  "Gaurav Taneja",
  "Harinder Narula",
  "Indrajit Chakraborty",
  "Jeevan Thakur",
  "Kartikeya Mishra",
  "Lalit Saxena",
  "Manish Agarwal",
  "Naveen Kohli",
];

const populateUsers = () => {
  return new Promise((resolve, reject) => {
    const values = users
      .map((name) => {
        const email = `${name.toLowerCase().replace(/\s+/g, ".")}+${Math.floor(
          Math.random() * 10000
        )}@example.com`;
        const escapedName = name.replace(/'/g, "''");
        return `('${escapedName}', '${email}')`;
      })
      .join(", ");

    const query = `INSERT INTO users (name, email) VALUES ${values};`;
    db.query(query, (err, data) => {
      if (err) {
        reject("Error inserting users:", err);
        return;
      }
      resolve("All users inserted successfully.");
    });
  });
};
export default populateUsers;
