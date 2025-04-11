CREATE DATABASE IF NOT EXISTS fids_db;
USE fids_db;

CREATE TABLE IF NOT EXISTS flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    airline VARCHAR(100) NOT NULL,
    direction ENUM('A', 'D') NOT NULL COMMENT 'A=Arrival, D=Departure',
    airport VARCHAR(100) NOT NULL,
    airport_code VARCHAR(10) NOT NULL,
    bay VARCHAR(10),
    belt VARCHAR(10),
    belt_open TIME,
    belt_close TIME,
    iata VARCHAR(10),
    gate VARCHAR(10),
    gate_open TIME,
    gate_close TIME,
    scheduled_time DATETIME NOT NULL,
    estimated_time DATETIME,
    status VARCHAR(50) DEFAULT 'Schedule',
    remarks VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    closed BOOLEAN DEFAULT FALSE,
    delay_reason VARCHAR(255)
);

-- Create indexes for better performance
CREATE INDEX idx_flight_number ON flights(flight_number);
CREATE INDEX idx_scheduled_time ON flights(scheduled_time);
CREATE INDEX idx_status ON flights(status);
CREATE INDEX idx_direction ON flights(direction);
