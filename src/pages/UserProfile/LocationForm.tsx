import React from "react";
import {Box, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import authenticator from "../../services/authenticator";
import axios from "axios";
import { useQuery } from "react-query";

const fetchLocation = async () => {
    let username = authenticator.getCurrentUsername();
    let url = "https://ezmeet2022.herokuapp.com/user/getLocation/";
    const res = await axios.get(url + username + "/").then(response => response.data.data);
    console.log(res);
    return res;
};

const LocationForm = () => {
    const [status, setStatus] = React.useState('');
    const {data, isLoading} = useQuery("get-location", fetchLocation);
    const [initialValues, setInitialValues] = React.useState<{latitude: number, longitude: number, address: string}>({
        latitude: 0.0,
        longitude: 0.0,
        address: "",
    });

    React.useEffect(() => {
        if(data) {
            setInitialValues({
                latitude: data.latitude,
                longitude: data.longitude,
                address: data.address,
            });
        }
    }, [data]);

    const getLocation = () => {
        if(!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        }
        else {
            setStatus('Locating');
            navigator.geolocation.getCurrentPosition((position) => {
                const api_key = 'AIzaSyAewATdOgz6pPJOektLnI6MkE7G_N3A1UI';
                setStatus('');
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false&key=${api_key}`)
                .then(response => response.json())
                .then(data => {
                    setInitialValues({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    address: data.results[0].formatted_address});

                    let url = "https://ezmeet2022.herokuapp.com/user/setLocation/";
                    let username = authenticator.getCurrentUsername();
                    axios.put(url + username + "/", {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        address: data.results[0].formatted_address,
                    });
                })
                .catch(error => alert(error));
            }, (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location Information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");  
                }
            });
        }
    }

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values: any) => {
        //Fetch Live Location
        getLocation();
        //Axios POST request
        console.log(values);
    }
    return(
        <Box m="20px">
            <h2>{status}</h2>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
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
                                variant="outlined"
                                type="number"
                                label="Latitude"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.latitude}
                                name="latitude"
                                inputProps={{readOnly: true}}
                                error={!!touched.latitude && !!errors.latitude}
                                helperText={touched.latitude && errors.latitude}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                label="Longitude"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.longitude}
                                name="longitude"
                                inputProps={{readOnly: true}}
                                error={!!touched.longitude && !!errors.longitude}
                                helperText={touched.longitude && errors.longitude}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                inputProps={{readOnly: true}}
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{gridColumn: "span 4"}}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="primary" variant="contained">
                                Update Location
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default LocationForm;