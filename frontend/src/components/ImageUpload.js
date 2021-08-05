import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  imgPreview: {
    width: "70%",
    height: 240,
    objectFit: "cover",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
  },

  imgPreviewError: {
    width: "70%",
    height: 240,
    objectFit: "cover",
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(1),
  },
}));

export default function ImageUpload({
  onChange,
  image,
  error,
  helperText,
  text,
}) {
  const styles = useStyles();
  const [previewImage, setPreviewImage] = useState(null);

  function handleImageFileChange(event) {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    onChange && onChange(event); // send the image to outside
  }

  return (
    <Grid container alignItems="center" justify="space-evenly">
      <Grid item xs={6}>
        <img
          className={error ? styles.imgPreviewError : styles.imgPreview}
          src={previewImage === null ? image : previewImage}
          alt=""
        />
      </Grid>
      {helperText ? (
        <Grid item xs={3}>
          <Typography
            color={error && "secondary"}
            variant="caption"
            component="span"
          >
            {helperText}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={1}></Grid>
      )}
      <Grid item>
        <Button variant="outlined" component="label">
          {text}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageFileChange}
          />
        </Button>
      </Grid>
    </Grid>
  );
}
