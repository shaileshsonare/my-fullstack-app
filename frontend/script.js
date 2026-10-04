document.getElementById('load-btn').addEventListener('click', async () => {
    const list = document.getElementById('employee-list');
    list.innerHTML = '<li>Loading...</li>';
    
    try {
        const response = await fetch('http://localhost:3000/api/employees');
        const employees = await response.json();
        
        list.innerHTML = ''; // Clear loading text
        
        if (employees.length === 0) {
            list.innerHTML = '<li>No employees found.</li>';
            return;
        }
        
        employees.forEach(emp => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${emp.name}</strong> <br> 
                            Dept: ${emp.department} <br> 
                            Salary: $${emp.salary}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        list.innerHTML = '<li style="color: red;">Failed to load data. Is the backend running?</li>';
    }
});