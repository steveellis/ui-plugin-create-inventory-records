import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PaneFooter,
  Button,
  Pane,
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
  ConfirmationModal
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import {
  InstanceAccordion,
  HoldingAccordion,
  ItemAccordion,
} from './components';
import {
  validateInstance,
  validateHolding,
  validateItem,
} from './util';

const initialStatus = {
  instance: true,
  holding: true,
  item: true,
};

const validate = (values) => {
  const instance = validateInstance(values.instance);
  const holding = validateHolding(values.holding);
  const item = validateItem(values.item);

  if (isEmpty(instance) &&
    isEmpty(holding) &&
    isEmpty(item)) {
    return {};
  }

  return {
    instance,
    holding,
    item,
  };
};

class CreateRecordsForm extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  exitForm = () => {
    const pristine = this.props.pristine;
    if (!pristine) {
      this.toggleModal();
    } else {
      this.confirmClose();
    }
  }

  confirmClose = () => {
    this.props.onClose();
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen
    }));
  }

  render() {
    const {
      handleSubmit,
      form,
      pristine,
      submitting,
    } = this.props;

    const isModalOpen = this.state.isModalOpen;
    return (
      <form
        onSubmit={handleSubmit}
        id="create-records-form"
        data-test-create-records-form
      >
        <Pane
          paneTitle={<FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />}
          defaultWidth="fill"
          footer={
            <PaneFooter
              renderStart={
                <Button
                  id="cancel"
                  buttonStyle="default mega"
                  onClick={this.exitForm}
                >
                  <FormattedMessage id="ui-plugin-create-inventory-records.cancel" />
                </Button>
              }
              renderEnd={
                <Button
                  buttonStyle="primary mega"
                  id="save-records"
                  type="submit"
                  disabled={pristine || submitting}
                  onClick={handleSubmit}
                >
                  <FormattedMessage id="ui-plugin-create-inventory-records.saveAndClose" />
                </Button>
              }
            />
          }
        >
          <AccordionStatus>
            <Row end="xs">
              <Col data-test-expand-all xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet initialStatus={initialStatus}>
              <InstanceAccordion />
              <HoldingAccordion change={form.change} />
              <ItemAccordion />
            </AccordionSet>
          </AccordionStatus>
        </Pane>
        <ConfirmationModal
          id="cancel-editing-confirmation"
          open={isModalOpen}
          message={<FormattedMessage id="stripes-form.unsavedChanges" />}
          heading={<FormattedMessage id="stripes-form.areYouSure" />}
          onConfirm={this.toggleModal}
          onCancel={this.confirmClose}
          confirmLabel={<FormattedMessage id="stripes-form.keepEditing" />}
          cancelLabel={<FormattedMessage id="stripes-form.closeWithoutSaving" />}
        />
      </form>
    );
  }
}


export default stripesFinalForm({
  validate,
  navigationCheck: false,
})(CreateRecordsForm);
