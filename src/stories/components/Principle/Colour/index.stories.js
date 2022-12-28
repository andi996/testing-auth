import React, { Fragment } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Layout from "../../../../components/Layout/Layout";
import { Colors } from "../../../../themes";

const styles = {
  // primary colors
  midBlue: {
    backgroundColor: Colors.primary.mid_blue,
    color: "white",
  },

  paleGrey: {
    backgroundColor: Colors.primary.pale_gray,
    color: Colors.neutral.greyish_brown,
  },
  veryLightBlue: {
    backgroundColor: Colors.primary.very_light_blue,
    color: Colors.neutral.greyish_brown,
  },
  darkBlue: {
    backgroundColor: Colors.primary.dark_blue,
    color: "white",
  },

  // secondary colors
  clearBlue: {
    backgroundColor: Colors.secondary.clear_blue,
    color: "white",
  },
  clearBlueLight: {
    backgroundColor: Colors.secondary.clear_blue_light,
    color: Colors.neutral.greyish_brown,
  },
  highlightGreen: {
    backgroundColor: Colors.secondary.highlight_green,
    color: "white",
  },
  greenLight: {
    backgroundColor: Colors.secondary.green_light,
    color: Colors.neutral.greyish_brown,
  },
  red: {
    backgroundColor: Colors.secondary.red,
    color: "white",
  },
  redLight: {
    backgroundColor: Colors.secondary.highlight_green,
    color: Colors.neutral.greyish_brown,
  },
  orangeYellow: {
    backgroundColor: Colors.secondary.orange_yellow,
    color: "white",
  },
  orangeYellowLight: {
    backgroundColor: Colors.secondary.orange_yellow_light,
    color: Colors.neutral.greyish_brown,
  },

  orange: {
    backgroundColor: Colors.secondary.orange,
    color: "white",
  },
  orangeLight: {
    backgroundColor: Colors.secondary.orange_light,
    color: Colors.neutral.greyish_brown,
  },
  purple: {
    backgroundColor: Colors.secondary.purple,
    color: "white",
  },
  purpleLight: {
    backgroundColor: Colors.secondary.purple_light,
    color: Colors.neutral.greyish_brown,
  },

  // neutral colors
  greyishBrown: {
    backgroundColor: Colors.neutral.greyish_brown,
    color: "white",
  },
  brownGrey: {
    backgroundColor: Colors.neutral.brown_grey,
    color: "white",
  },
  brownLightGrey: {
    backgroundColor: Colors.neutral.brown_light_grey,
    color: "white",
  },
  veryLightGrey: {
    backgroundColor: Colors.neutral.very_light_grey,
    color: Colors.neutral.greyish_brown,
  },
  white: {
    backgroundColor: "white",
    color: Colors.neutral.greyish_brown,
  },

  // gradient colors
  karirRL: {
    backgroundImage: `linear-gradient( 202.71deg, ${Colors.primary.mid_blue} 9.32%, ${Colors.primary.dark_blue} 92.16% )`,
    color: "white",
  },
  karirLR: {
    backgroundImage: `linear-gradient( 140.11deg, ${Colors.secondary.clear_blue} 13.07%, ${Colors.primary.dark_blue} 84.59% )`,
    color: "white",
  },
  skeleton: {
    background: `linear-gradient(270deg, rgba(210, 210, 210, 0.05) 0%, #DBDBDB 50%)`,
    color: "white",
  },
  // overlay colors
  blueLight: {
    backgroundImage: Colors.overlay.blue_light,
    color: Colors.neutral.greyish_brown,
  },
  blueDark: {
    backgroundImage: Colors.overlay.blue_dark,
    color: Colors.neutral.greyish_brown,
  },
  dark: {
    background: Colors.overlay.dark,
    color: "white",
  },
};

export default {
  component: Layout,
  title: "Design System/Principle/Colour",
};

const Template = () => (
  <Fragment>
    {/* Primary colors */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <h2 className="h2">Primary Colors</h2>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.midBlue}>
              <Typography gutterBottom variant="h6" component="h6">
                Mid Blue (#1D62AE)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.paleGrey}>
              <Typography gutterBottom variant="h6" component="h6">
                Pale Grey (#F4FAFF)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.veryLightBlue}>
              <Typography gutterBottom variant="h6" component="h6">
                Very Light Blue (#E5EDF6)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.darkBlue}>
              <Typography gutterBottom variant="h6" component="h6">
                Dark Blue (#0F4A89)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

    {/* Secondary colors */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <h2 className="h2">Secondary Colors</h2>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.clearBlue}>
              <Typography gutterBottom variant="h6" component="h6">
                Clear Blue (#1F96FF)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.clearBlueLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Clear Blue Light (#E9F4)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.highlightGreen}>
              <Typography gutterBottom variant="h6" component="h6">
                Highlight Green (#64B40C)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.greenLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Green Light (#EFF7E7)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.red}>
              <Typography gutterBottom variant="h6" component="h6">
                Red
                <br />
                (#CB0000)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.redLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Red Light
                <br />
                (#FAE5E5)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.orange}>
              <Typography gutterBottom variant="h6" component="h6">
                Orange
                <br />
                (#FF8C02)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.orangeLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Orange Light
                <br />
                (#FFE4E6)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.orangeYellow}>
              <Typography gutterBottom variant="h6" component="h6">
                Orange Yellow (#FFA800)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.orangeYellowLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Orange Yellow Light (#FFF6E5)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.purple}>
              <Typography gutterBottom variant="h6" component="h6">
                Purple
                <br />
                (#7529A7)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.purpleLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Purple Light
                <br />
                (#F1EAF6)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

    {/* Neutral colors */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <h2 className="h2">Neutral Colors</h2>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.greyishBrown}>
              <Typography gutterBottom variant="h6" component="h6">
                Greyish Brown (#4C4C4C)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.brownGrey}>
              <Typography gutterBottom variant="h6" component="h6">
                Brown Grey (#797979)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.brownLightGrey}>
              <Typography gutterBottom variant="h6" component="h6">
                Brown Light Grey
                <br />
                (#888888)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.veryLightGrey}>
              <Typography gutterBottom variant="h6" component="h6">
                Very Light Grey
                <br />
                (#EEEEEE)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.white}>
              <Typography gutterBottom variant="h6" component="h6">
                White
                <br />
                (#FFFFFF)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

    {/* Gradient colors */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <h2 className="h2">Gradient Colors</h2>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.karirRL}>
              <Typography gutterBottom variant="h6" component="h6">
                Gradient
                <br />
                (R-L)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.karirLR}>
              <Typography gutterBottom variant="h6" component="h6">
                Gradient
                <br />
                (L-R)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.skeleton}>
              <Typography gutterBottom variant="h6" component="h6">
                Skeleton
                <br />
                (L-R)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

    {/* overlay colors */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <h2 className="h2">Overlay Colors</h2>
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.blueLight}>
              <Typography gutterBottom variant="h6" component="h6">
                Blue Light
                <br />
                (Gradient)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.blueDark}>
              <Typography gutterBottom variant="h6" component="h6">
                Blue Dark
                <br />
                (Gradient)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={2} sm={2}>
        <Card>
          <CardActionArea>
            <CardContent style={styles.dark}>
              <Typography gutterBottom variant="h6" component="h6">
                Dark
                <br />
                (Gradient)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  </Fragment>
);

export const Colour = Template.bind({});

Colour.args = {};
