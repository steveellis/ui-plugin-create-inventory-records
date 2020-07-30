
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Checkbox,
  Select,
  TextField,
  Datepicker,
} from '@folio/stripes/components';

import ContributorFields from '../ContributorFields';

const InstanceAccordion = () => {
  return (
    <Accordion
      id="instance"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.instanceRecord" />}
    >
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.discoverySuppress" />}
            name="instance.discoverySuppress"
            id="input_discovery_suppress"
            component={Checkbox}
            type="checkbox"
          />
        </Col>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.instanceStatusTerm.uncataloged">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.instanceStatusTerm" />}
                name="instance.statusTerm"
                id="select_instance_status_term"
                type="text"
                disabled
                component={Select}
                placeholder={placeholder}
                dataOptions={[]}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.resourceTitle" />}
            name="instance.title"
            id="input_instance_title"
            component={TextField}
            fullWidth
            required
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.publicationDate" />}
            name="instance.publicationDate"
            dateFormat="YYYY-MM-DD"
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.isbn" />}
            name="instance.isbn"
            id="isbn"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.issn" />}
            name="instance.issn"
            id="issn"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectResourceType">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.resourceType" />}
                name="instance.instanceTypeId"
                id="select_instance_type"
                type="text"
                required
                component={Select}
                placeholder={placeholder}
                dataOptions={[]}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <ContributorFields />
    </Accordion>
  );
};

export default InstanceAccordion;
