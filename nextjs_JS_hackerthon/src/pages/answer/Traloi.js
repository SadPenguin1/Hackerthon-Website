import React, { useEffect, useState } from "react";

// @mui
import { Typography, Grid, Box, Button, Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import ComponentCard from '../../sections/overview/ComponentCard';
import { checkCodeJsonAPI, createAnswerAPI } from 'src/service/hackerthon/hackerthon.answer.service';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';

import { Monaco } from 'src/sections/overview/Monaco';
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from '../../redux/store';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

// -------
// layouts
import Layout from '../../layouts';
import Scrollbar from "src/components/Scrollbar";

Traloi.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};


const languageSelections = [
    'JAVA',
    'C',
    'CS',
    'CPP',
    'PYTHON',
    'GO',
    'RUBY',
    'KOTLIN',
    'RUST',
    'SCALA',
    'HASKELL',
];

export default function Traloi() {
    const [postBody, setPostBody] = React.useState("");
    const dispatch = useDispatch();
    const { exercises, search } = useSelector((state) => state.hackerthonExercise);
    const [response, setResponse] = useState({
        averageExecutionDuration: null,
        compilationDuration: null,
        dateTime: '',
        error: '',
        language: '',
        memoryLimit: null,
        statusCode: null,
        testCasesResult: {},
        timeLimit: null,
        verdict: '',
    });
    const { exercise } = useSelector((state) => state.hackerthonExercise);
    const [languageSelection, setLaguageSelection] = React.useState(languageSelections[0]);

    const handleChange = (event) => {
        setLaguageSelection(event.target.value);
    };

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(getExercise(id));
    }, []);

    // const handleSubmit = async () => {
    //     try {
    //         console.log(postBody)
    //         let resp = await createAnswerAPI({
    //             id: "",
    //             userAnswer: postBody,
    //         });
    //         console.log(resp);
    //         console.log("Tạo course thành công");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const handleCheckCode = async () => {

        const requestData = {
            language: languageSelection,
            memoryLimit: 1500,
            sourcecode: postBody,
            testCases: {
                additionalProp1: {
                    expectedOutput: exercise.output,
                    input: exercise.input
                }
            },
            timeLimit: 15,
            exercise: {
                id: id
            }
        };

        console.log("Request Data:", requestData);
        try {

            var resp = await checkCodeJsonAPI(requestData);
            console.log(resp);
            setResponse(resp);

            console.log("oke");
        } catch (err) {
            console.log(err);
        }

    }
    console.log(response)
    console.log(response.verdict)
    let respString = JSON.stringify(response).toString();
    console.log(respString)
    return (

        <Stack spacing={2} style={{ width: 'max', height: '700px' }}>
            <Box style={{ width: 'max', height: '500px' }}>
                <FormControl sx={{ m: 0.5, minWidth: 30, borderRadius: '4px' }} size="small">
                    <InputLabel id="demo-select-small-label">Language</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={languageSelection}
                        // defaultValue="CPP"
                        label="Language"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Language</em>
                        </MenuItem>
                        {
                            languageSelections.map((languageSelection) => (
                                <MenuItem
                                    key={languageSelection}
                                    value={languageSelection}
                                >
                                    {languageSelection}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>

                <Monaco postBody={postBody} setPostBody={setPostBody} />
            </Box>
            <Stack style={{ width: 'max', height: '50px' }}>
                <Button style={buttonStyle} variant="contained" color="primary" onClick={() => handleCheckCode()} >Submitttt</Button>
            </Stack>
            <Stack style={{ width: 'max', height: '130px' }}>
                <Typography style={{ fontSize: '12px' }}>Result: {response.verdict}</Typography>
                <Typography style={{ fontSize: '12px' }}>Language: {response.language}</Typography>
                <Typography style={{ fontSize: '12px' }}>Error: {response.error}</Typography>
                <Typography style={{ fontSize: '12px' }}>Execution: {response.averageExecutionDuration}</Typography>
                <Typography style={{ fontSize: '12px' }}>Date: {response.dateTime}</Typography>

            </Stack>
        </Stack >


    );
}
const buttonStyle = {
    marginRight: '10px', // Thay đổi giá trị của marginRight để căn chỉnh khoảng cách với lề
};
