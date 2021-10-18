// Your code here
function createEmployeeRecord(ele) {
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(eleData) {
    return eleData.map(ele => createEmployeeRecord(ele));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const date = dateStamp.split(' ')[0];
    const hour = dateStamp.split(' ')[1];

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const date = dateStamp.split(' ')[0];
    const hour = dateStamp.split(' ')[1];

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === dateStamp);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === dateStamp);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(data => data.date);
    let worked = 0;

    dates.forEach(date => {
        worked = worked + wagesEarnedOnDate(employeeRecord, date);
    })

    return worked;
}

function calculatePayroll(arr) {
    let total = 0;

    arr.forEach(e => {
        total = total + allWagesFor(e);
    })

    return total;
}