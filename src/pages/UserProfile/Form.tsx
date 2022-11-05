import React from "react";
import {Box, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const initialValues = {
    firstName: "Jake",
    lastName: "Paul",
    email: "Jake_Paul@gmail.com",
    userName: "jakePaul",
    preferences: [],
}

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values: any) => {
        console.log(values);
    }
    return(
        <Box m="20px">
            <Formik
                onSubmit = {handleFormSubmit}
                initialValues = {initialValues}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                name="userName"
                                disabled={true}
                                error={!!touched.userName && !!errors.userName}
                                helperText={touched.userName && errors.userName}
                                sx={{gridColumn: "span 4"}}
                            />
                            <Typography
                                variant="h5"
                                color="#3A3042"
                                fontWeight="bold"
                            >
                                Preferences
                            </Typography>
                            <FormGroup>
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={handleChange}
                                        name="preferences"
                                        value="preference1"
                                    />}
                                    label="Preference 1"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={handleChange}
                                        name="preferences"
                                        value="preference2"
                                    />}
                                    label="Preference 2"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={handleChange}
                                        name="preferences"
                                        value="preference3"
                                    />}
                                    label="Preference 3"
                                />
                            </FormGroup>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="primary" variant="contained">
                                Save
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Form;