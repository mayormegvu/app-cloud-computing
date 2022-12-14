/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Note } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function NoteUpdateForm(props) {
  const {
    id,
    note,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    note: undefined,
    sentiment: undefined,
    spanish: undefined,
  };
  const [note, setNote] = React.useState(initialValues.note);
  const [sentiment, setSentiment] = React.useState(initialValues.sentiment);
  const [spanish, setSpanish] = React.useState(initialValues.spanish);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...noteRecord };
    setNote(cleanValues.note);
    setSentiment(cleanValues.sentiment);
    setSpanish(cleanValues.spanish);
    setErrors({});
  };
  const [noteRecord, setNoteRecord] = React.useState(note);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Note, id) : note;
      setNoteRecord(record);
    };
    queryData();
  }, [id, note]);
  React.useEffect(resetStateValues, [noteRecord]);
  const validations = {
    note: [{ type: "Required" }],
    sentiment: [{ type: "Required" }],
    spanish: [{ type: "Required" }],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          note,
          sentiment,
          spanish,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            Note.copyOf(noteRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "NoteUpdateForm")}
    >
      <TextField
        label="Note"
        isRequired={true}
        isReadOnly={false}
        defaultValue={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note: value,
              sentiment,
              spanish,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <TextField
        label="Sentiment"
        isRequired={true}
        isReadOnly={false}
        defaultValue={sentiment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note,
              sentiment: value,
              spanish,
            };
            const result = onChange(modelFields);
            value = result?.sentiment ?? value;
          }
          if (errors.sentiment?.hasError) {
            runValidationTasks("sentiment", value);
          }
          setSentiment(value);
        }}
        onBlur={() => runValidationTasks("sentiment", sentiment)}
        errorMessage={errors.sentiment?.errorMessage}
        hasError={errors.sentiment?.hasError}
        {...getOverrideProps(overrides, "sentiment")}
      ></TextField>
      <TextField
        label="Spanish"
        isRequired={true}
        isReadOnly={false}
        defaultValue={spanish}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note,
              sentiment,
              spanish: value,
            };
            const result = onChange(modelFields);
            value = result?.spanish ?? value;
          }
          if (errors.spanish?.hasError) {
            runValidationTasks("spanish", value);
          }
          setSpanish(value);
        }}
        onBlur={() => runValidationTasks("spanish", spanish)}
        errorMessage={errors.spanish?.errorMessage}
        hasError={errors.spanish?.hasError}
        {...getOverrideProps(overrides, "spanish")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
