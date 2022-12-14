import React from "react";
import {Box, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography, FormLabel, FormControl} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import authenticator from "../../services/authenticator";
import axios from "axios";
import { useQuery } from "react-query";
import _ from 'lodash';
/*
interface UserDetails {
    username: string,
    password: string,
    email: string,
    group_id: number,
    preferences: string[],
}

let initialValues = {
    email: "LoremIpsum@email.com",
    userName: "LoremIpsum",
    preferences: [""],
}
*/

const fetchUser = async () => {
    let username = authenticator.getCurrentUsername();
    let url = "https://ezmeet2022.herokuapp.com/";
    const res = await axios.get(url+"user/get/"+username+"/").then(response => response.data.data);
    console.log(res);
    return res;
}

const Form = () => {
    const [edit, setEdit] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("Edit");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {data, isLoading} = useQuery("get-user", fetchUser);
    const [saveStatus, setSaveStatus] = React.useState(false); //true- disabled, false- not disabled
    const [initialValues, setInitialValues] = React.useState<{email: string, userName: string,
    preferences: string[], show_location: boolean}>({
        email: "",
        userName: "",
        preferences: [],
        show_location: false,
    });
    const error = initialValues.preferences.length === 0;
    const [lastCopy, setLastCopy] = React.useState(initialValues);
    React.useEffect(() => {
        if(data) {
            setInitialValues({
                email: data.email,
                userName: data.username,
                preferences: data.preferences,
                show_location: data.show_location,
            })
            setLastCopy({
                email: data.email,
                userName: data.userName,
                preferences: data.preferences,
                show_location: data.show_location,
            })
        }
    }, [data]);
    
    React.useEffect(() => {
        if(edit) {
            setSaveStatus(edit && error);
        }
        else {
            setSaveStatus(true);
        }
    }, [edit, error]);
    
    if(isLoading) {
        return(<h2>Loading</h2>);
    }
    
    const updateLocation = (value: boolean) => {
        setInitialValues({
            email: initialValues.email,
            userName: initialValues.userName,
            preferences: initialValues.preferences,
            show_location: !value,
        });
    }
    const changePreferences = (value: string, add: boolean) => {
        let filteredArray = [];
        if(!add) { //add value to preferences
            filteredArray = [...initialValues.preferences, value];
        }
        else {
            filteredArray = initialValues.preferences.filter(e => {return e !== value});
        }
        setInitialValues({
            email: initialValues.email,
            userName: initialValues.userName,
            preferences: filteredArray,
            show_location: initialValues.show_location,
        });
    }
    const handleEmailChange = (e: any) => {
        setInitialValues({
            email: e.target.value,
            userName: initialValues.userName,
            preferences: initialValues.preferences,
            show_location: initialValues.show_location,
        });
    }
    const handleFormSubmit = (values: any) => {
        console.log(values);
        //Axios POST request
        let url = "https://ezmeet2022.herokuapp.com/user/update/"
        let username = authenticator.getCurrentUsername();
        axios.put(url + username + "/", {
            "user": values
        });
        setLastCopy({
            email: initialValues.email,
            userName: initialValues.userName,
            preferences: initialValues.preferences,
            show_location: initialValues.show_location,
        });
        setEdit(false);
        setButtonText("Edit");
    }
    const handleFormEdit = () => {
        if(edit) {
            setEdit(false);
            if(!_.isEqual(lastCopy, initialValues)) {
                setInitialValues(lastCopy);
            }
            setButtonText("Edit");
        }
        else {
            setEdit(true);
            setButtonText("Cancel");
        }
        console.log("Edit Pressed");
    }
    return(
        <Box m="20px">
            <Formik
                onSubmit = {handleFormSubmit}
                initialValues = {initialValues}
                enableReinitialize={true}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset}) => (
                    <form onSubmit={handleSubmit} >
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                            <TextField
                                id="user-email" 
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleEmailChange}
                                value={values.email}
                                name="email"
                                inputProps={{readOnly: !edit}}
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField 
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                name="userName"
                                disabled={true}
                                InputLabelProps={{shrink: true}}
                                error={!!touched.userName && !!errors.userName}
                                helperText="Username cannot be changed"
                                sx={{gridColumn: "span 4"}}
                            />
                            <Typography
                                variant="h5"
                                color="#3A3042"
                                fontWeight="bold"
                            >
                                Show Location
                            </Typography>
                            <FormGroup>
                                <FormControlLabel 
                                    control={<Checkbox
                                        onChange={() => updateLocation(values.show_location)}
                                        value={values.show_location}
                                        name="location"
                                        disabled={!edit}
                                        checked={values.show_location ? true : false} 
                                    />} 
                                    label="Display Location"                                />
                            </FormGroup>
                            <Typography
                                variant="h5"
                                color="#3A3042"
                                fontWeight="bold"
                            >
                                Preferences
                            </Typography>
                            <FormControl
                                required
                                error={error}
                            >
                            <FormGroup>
                                <FormLabel component="legend">You need to have a minimum of 1 preference selected</FormLabel>
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={() => changePreferences("restaurant", initialValues.preferences.includes("restaurant"))}
                                        name="preferences"
                                        value="restaurant"
                                        disabled={!edit}
                                        checked={initialValues?.preferences?.includes("restaurant") ? true : false}
                                    />}
                                    label="Restaurants"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={() => changePreferences("nature", initialValues.preferences.includes("nature"))}
                                        name="preferences"
                                        value="nature"
                                        disabled={!edit}
                                        checked={initialValues?.preferences?.includes("nature") ? true : false}
                                    />}
                                    label="Nature"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={() => changePreferences("shopping", initialValues.preferences.includes("shopping"))}
                                        name="preferences"
                                        value="shopping"
                                        disabled={!edit}
                                        checked={initialValues?.preferences?.includes("shopping") ? true : false}
                                    />}
                                    label="Shopping"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={() => changePreferences("entertainment", initialValues.preferences.includes("entertainment"))}
                                        name="preferences"
                                        value="entertainment"
                                        disabled={!edit}
                                        checked={initialValues?.preferences?.includes("entertainment") ? true : false}
                                    />}
                                    label="Entertainment"
                                />
                                <FormControlLabel 
                                    control={
                                    <Checkbox
                                        onChange={() => changePreferences("museums", initialValues.preferences.includes("museums"))}
                                        name="preferences"
                                        value="museums"
                                        disabled={!edit}
                                        checked={initialValues?.preferences?.includes("museums") ? true : false}
                                    />}
                                    label="Museums"
                                />
                            </FormGroup>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button sx= {{"mr":"10px"}} color="primary" variant="contained" onClick={handleFormEdit}>
                                {buttonText}
                            </Button>
                            <Button type="submit" color="primary" variant="contained" disabled={saveStatus}>
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