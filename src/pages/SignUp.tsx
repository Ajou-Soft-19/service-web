import React, { useState } from "react";
import Layout from "../components/Layout";
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from "@mui/material";
import EmergencyCarSignUpForm from "../components/EmergencyCarSignUpForm";
import NormalCarSignUpForm from "../components/NormalCarSignUpForm";

const SignUp = () => {
  const [carKind, setCarKind] = useState<"normal" | "emergency">("normal");

  return (
    <Layout>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">회원가입</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={"normal"}
        >
          <FormControlLabel
            value="normal"
            control={<Radio />}
            label="일반차"
            onClick={() => setCarKind("normal")}
          />
          <FormControlLabel
            value="emergency"
            control={<Radio />}
            label="응급차"
            onClick={() => setCarKind("emergency")}
          />
        </RadioGroup>
        {carKind === "normal" ? <NormalCarSignUpForm /> : <EmergencyCarSignUpForm />}
      </FormControl>
    </Layout>
  );
};

export default SignUp;
