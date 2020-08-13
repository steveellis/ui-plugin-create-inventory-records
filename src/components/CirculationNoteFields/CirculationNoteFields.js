import React from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  TextField,
  Select,
  Checkbox,
  RepeatableField,
  Row,
  Col,
} from '@folio/stripes/components';

import { circulationNoteTypes } from '../../consts';

const CirculationNoteFields = () => {
  const intl = useIntl();
  const noteOptions = circulationNoteTypes.map(({ id, value }) => ({
    label: intl.formatMessage({ id }),
    value,
  }));

  return (
    <FieldArray
      id="clickable-add-circulation-note"
      component={RepeatableField}
      name="item.circulationNotes"
      legend={<FormattedMessage id="ui-plugin-create-inventory-records.circulationNotes" />}
      addLabel={<FormattedMessage id="ui-plugin-create-inventory-records.addCirculationNote" />}
      renderField={(_, index) => (
        <Row>
          <Col sm={4}>
            <FormattedMessage id="ui-plugin-create-inventory-records.selectType">
              {placeholder => <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.circulationNotes.noteType" />}
                name={`item.circulationNotes[${index}].noteType`}
                placeholder={placeholder}
                component={Select}
                dataOptions={noteOptions}
              />
              }
            </FormattedMessage>
          </Col>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.circulationNotes.name" />}
              name={`item.circulationNotes[${index}].note`}
              component={TextField}
            />
          </Col>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.circulationNotes.staffOnly" />}
              name={`item.circulationNotes[${index}].staffOnly`}
              id="input_staff_only"
              component={Checkbox}
              type="checkbox"
              inline
              vertical
            />
          </Col>
        </Row>
      )}
    />
  );
};

export default CirculationNoteFields;
