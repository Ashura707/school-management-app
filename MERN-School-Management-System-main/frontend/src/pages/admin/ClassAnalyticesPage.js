import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';

const ClassAnalyticsPage = () => {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);

    useEffect(() => {
        // Simulate an API call with mock data
        const fetchClassData = async () => {
            const mockData = {
                name: `Class ${classId}`,
                year: '2024',
                teachers: [
                    { _id: 't1', name: 'Teacher 1' },
                    { _id: 't2', name: 'Teacher 2' },
                ],
                students: [
                    { _id: 's1', name: 'Student 1', gender: 'male' },
                    { _id: 's2', name: 'Student 2', gender: 'female' },
                    { _id: 's3', name: 'Student 3', gender: 'female' },
                ],
            };
            setClassData(mockData);
        };

        fetchClassData();
    }, [classId]);

    if (!classData) {
        return <p>Loading...</p>;
    }

    const maleCount = classData.students.filter(student => student.gender === 'male').length;
    const femaleCount = classData.students.filter(student => student.gender === 'female').length;

    const data = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [maleCount, femaleCount],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Typography variant="h4">{classData.name}</Typography>
                        <Typography variant="subtitle1">{classData.year}</Typography>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <Typography variant="h6">Teachers</Typography>
                        <ul>
                            {classData.teachers.map((teacher) => (
                                <li key={teacher._id}>{teacher.name}</li>
                            ))}
                        </ul>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <Typography variant="h6">Students</Typography>
                        <ul>
                            {classData.students.map((student) => (
                                <li key={student._id}>{student.name}</li>
                            ))}
                        </ul>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Typography variant="h6">Gender Distribution</Typography>
                        <Pie data={data} />
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export default ClassAnalyticsPage;
