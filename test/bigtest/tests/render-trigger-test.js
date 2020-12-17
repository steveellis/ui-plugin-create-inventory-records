import React from 'react';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { Button } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';
import setupStripesCore from '@folio/stripes-core/test/bigtest/helpers/setup-application';

import mirageOptions from '../network';

import CreateRecordsPluginInteractor from '../interactors/createRecordsPlugin';

const plugin = new CreateRecordsPluginInteractor();

describe('renderTrigger', () => {
  setupStripesCore({
    mirageOptions: {
      serverType: 'miragejs',
      ...mirageOptions
    },
    scenarios: ['default'],
    stripesConfig: { hasAllPerms: true },

    // setup a dummy app for the plugin that renders the plugin
    modules: [{
      type: 'app',
      name: '@folio/ui-dummy',
      displayName: 'dummy.title',
      route: '/dummy',
      module: () => (
        <Pluggable
          aria-haspopup="true"
          type="create-inventory-records"
          id="clickable-add-inventory-records"
          renderTrigger={({ onClick, ...rest }) => (
            <Button
              {...rest} // necessary for data-test attrs
              id="render-trigger-btn"
              onClick={onClick}
            >
              Custom Button
            </Button>
          )}
        />
      ),
    }],

    translations: {
      'dummy.title': 'Dummy App for renderTrigger'
    },
  });

  beforeEach(function () {
    this.visit('/dummy');
  });

  it('renders button', () => {
    expect(plugin.button.isPresent).to.be.true;
  });

  it('renders button with custom text', () => {
    expect(plugin.button.label).to.equal('Custom Button');
  });

  it('renders button with custom id', () => {
    expect(plugin.button.id).to.equal('render-trigger-btn');
  });

  describe('click trigger button', () => {
    beforeEach(async () => {
      await plugin.button.click();
      await plugin.whenLoaded();
    });

    it('opens the modal', () => {
      expect(plugin.form.isPresent).to.be.true;
    });

    describe('close modal', () => {
      beforeEach(async () => {
        await plugin.form.clickCancel();
      });

      it('closes the modal', () => {
        expect(plugin.form.isPresent).to.be.false;
      });
    });
  });
});
