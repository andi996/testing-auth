import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import StepperDefault from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Colors, Radius } from "../../../themes";
import { Check } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Body2, Body3, Heading4, Heading5 } from "../../Atom/Typography";
import { MobileStepper, Typography } from "@mui/material";
import { isMobile } from "../../../utils/useMediaQuery";
import RectangleButton from "../../Atom/Button/RectangleButton";

const CostumStepIconRoot = styled("div")({
  color: Colors.neutral.greyish_brown,
  backgroundColor: Colors.primary.very_light_blue,
  display: "flex",
  height: 32,
  width: 32,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: Radius.circle,
  "& .QontoStepIcon-completedIcon": {
    backgroundColor: Colors.primary.mid_blue,
    color: "white",
    zIndex: 1,
    fontSize: 14,
    height: 32,
    width: 32,
    borderRadius: Radius.circle,
    padding: 4,
  },
});

const CostumActiveStepIconRoot = styled("div")({
  color: "white",
  backgroundColor: Colors.primary.mid_blue,
  display: "flex",
  height: 32,
  width: 32,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: Radius.circle,
  "& .QontoStepIcon-completedIcon": {
    backgroundColor: Colors.primary.mid_blue,
    color: "white",
    zIndex: 1,
    fontSize: 14,
    height: 32,
    width: 32,
    borderRadius: Radius.circle,
    padding: 4,
  },
});

function CostumStepIcon(props) {
  const { completed, className, icon } = props;

  return (
    <CostumStepIconRoot className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <Heading5>{icon}</Heading5>
      )}
    </CostumStepIconRoot>
  );
}

const CostumActiveStepIcon = ({ icon }) => (
  <CostumActiveStepIconRoot>
    <Heading5>{icon}</Heading5>{" "}
  </CostumActiveStepIconRoot>
);

export default function Stepper(props) {
  const {
    state = 0,
    label,
    description,
    steps,
    currentStep,
    fullWidth,
    isDisabled,
    contentStyle,
    defaultButton = true,
    handleSubmit,
    handleDone,
  } = props;
  const [activeStep, setActiveStep] = React.useState(state);
  const Mobile = isMobile();

  const handleNext = async () => {
    if (activeStep < steps?.length - 1) {
      await handleSubmit(activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleDone();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    currentStep(activeStep);
  }, [activeStep]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // setTimeout(() => {
    //   window.scroll({ top: 270 + state * 80, behavior: `smooth` });
    // }, 300);
    // setActiveStep(state);
  }, [state]);

  return Mobile ? (
    <Box>
      <Box sx={{ width: "100%", p: 2 }}>
        <StepperDefault
          activeStep={activeStep}
          orientation="horizontal"
          // connector={null}
          sx={{
            ".MuiStepConnector-line": {
              borderColor: Colors.neutral.light_grey,
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={
                  activeStep == index ? CostumActiveStepIcon : CostumStepIcon
                }
              ></StepLabel>
            </Step>
          ))}
        </StepperDefault>
      </Box>
      <Box sx={{ width: "100%", p: `12px` }}>
        <Heading4 color={Colors.primary.mid_blue}>
          {steps[activeStep].label}
        </Heading4>
        <Body3 color={Colors.neutral.brown_grey}>
          {steps[activeStep].description}
        </Body3>
      </Box>
      <Box sx={{ height: "100%", width: "100%", p: `12px 16px`, flexGrow: 1 }}>
        {steps[activeStep]?.content}
      </Box>
      <MobileStepper
        sx={{ justifyContent: "space-around" }}
        variant="none"
        steps={steps.length}
        position="bottom"
        activeStep={activeStep}
        nextButton={
          <RectangleButton
            disable={isDisabled}
            onClick={handleNext}
            customStyle={{ minWidth: 160 }}
          >
            {activeStep === steps.length - 1 ? "Selesai" : "Lanjutkan"}
          </RectangleButton>
        }
        backButton={
          <RectangleButton
            // disabled={index === 0}
            onClick={handleBack}
            variant="text"
            customStyle={{ minWidth: 160 }}
          >
            Kembali
          </RectangleButton>
        }
      />
    </Box>
  ) : (
    <Box sx={{ maxWidth: fullWidth ? `100%` : 400 }}>
      <StepperDefault
        activeStep={activeStep}
        orientation="vertical"
        connector={null}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={
                activeStep == index ? CostumActiveStepIcon : CostumStepIcon
              }
            >
              {label && (
                <Heading4
                  color={
                    activeStep === index
                      ? Colors.primary.mid_blue
                      : Colors.neutral.greyish_brown
                  }
                >
                  {step.label}
                </Heading4>
              )}

              {description && (
                <Body2 color={Colors.neutral.brown_grey}>
                  {step.description}
                </Body2>
              )}
            </StepLabel>
            <StepContent
              sx={{
                pr: 0,
                ...contentStyle,
              }}
            >
              {step?.content}

              {defaultButton && (
                <Box
                  sx={{
                    width: `100%`,
                    // mb: 2,
                    gap: "8px",
                    display: "flex",
                    justifyContent: `center`,
                  }}
                >
                  <RectangleButton
                    onClick={handleBack}
                    variant="text"
                    customStyle={{
                      width: `100%`,
                      maxWidth: 282,
                      margin: 0,
                    }}
                  >
                    Kembali
                  </RectangleButton>

                  <RectangleButton
                    disable={isDisabled}
                    onClick={handleNext}
                    customStyle={{
                      width: `100%`,
                      maxWidth: 282,
                      margin: 0,
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Selesai" : "Lanjutkan"}
                  </RectangleButton>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </StepperDefault>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
