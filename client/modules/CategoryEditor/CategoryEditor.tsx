import _ from 'lodash';
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Flex,
  FlexItem,
  Panel,
  PanelContent,
  PanelTitle,
  Card,
} from 'graphen';
import Previewer from 'client/components/Previewer';
import * as types from './types';
import * as utils from '../../utils/translations';

function CategoryEditor(props: types.Props) {
  const { onAdd, onUpdate, category, loadCategories, onDelete } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const [isDirty, setIsDirty] = useState(false);

  const [name, setName] = useState('');
  const handleNameChange = useCallback(
    (event) => {
      setName(event.target.value);
      setIsDirty(true);
    },
    [setName, setIsDirty]
  );

  const [image, setImage] = useState(null);
  const loadImage = useCallback(
    (event: Event) => {
      if (event.currentTarget instanceof FileReader) {
        if (typeof event.currentTarget.result === 'string') {
          setImage(event.currentTarget.result);
        }
      }
    },
    [setImage]
  );
  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = _.head(event.currentTarget.files);
      const fileReader = new FileReader();
      fileReader.addEventListener('load', loadImage);
      fileReader.readAsDataURL(file);
    },
    [loadImage]
  );

  useEffect(() => {
    setName(category?.name || '');
    setImage(category?.image || null);
  }, [category, setName, setImage]);

  const handleAddCategory = useCallback(() => {
    onAdd(name, image);
    setName('');
    setImage(null);
  }, [onAdd, name, setName, image, setImage]);

  const handleUpdateCategory = useCallback(() => {
    if (category) {
      onUpdate(category.id, name, image);
      setIsDirty(false);
    }
  }, [onUpdate, category, name, setIsDirty, image]);

  const handleDeleteCategory = useCallback(() => {
    if (category) {
      onDelete(category.id);
    }
  }, [onDelete, category]);

  const updateButtonClasses = classNames(
    'gc-btn--primary',
    'gm-spacing-bl',
    'tst-category-editor-update',
    {
      'gc-btn--disabled': isDirty,
    }
  );

  return (
    <Card isGradient className="l-category-editor">
      <Panel>
        <PanelTitle>Category editor</PanelTitle>
        <PanelContent>
          <Flex isVertical>
            <FlexItem>
              <div className="gc-input gc-input--full">
                {/* eslint-disable jsx-a11y/label-has-associated-control */}
                <label htmlFor="category-name" className="gc-input__label">
                  Name
                </label>
                {/* eslint-enable jsx-a11y/label-has-associated-control */}
                <input
                  id="category-name"
                  value={name}
                  onChange={handleNameChange}
                  className="gc-input__field tst-category-editor-name"
                />
              </div>
            </FlexItem>
            <FlexItem className="gm-spacing-bm">
              <Flex isVertical alignItems="center">
                <FlexItem className="gm-spacing-bl">
                  <input
                    type="file"
                    name="category-image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="gm-spacing-bl"
                  />
                </FlexItem>
                <FlexItem>
                  <Previewer image={image} />
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              {_.isEmpty(category) && (
                <Button
                  isFull
                  className="gc-btn--primary tst-category-editor-add"
                  onClick={handleAddCategory}
                >
                  {utils.getLocalization('AddButton') ?? 'Add'}
                </Button>
              )}
              {!_.isEmpty(category) && (
                <Flex isVertical>
                  <FlexItem>
                    <Button
                      isFull
                      className={updateButtonClasses}
                      onClick={handleUpdateCategory}
                    >
                      {utils.getLocalization('UpdateButton') ?? 'Update'}
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button
                      isFull
                      className="gc-btn--danger tst-category-editor-delete"
                      onClick={handleDeleteCategory}
                    >
                      {utils.getLocalization('DeleteButton') ?? 'Delete'}
                    </Button>
                  </FlexItem>
                </Flex>
              )}
            </FlexItem>
          </Flex>
        </PanelContent>
      </Panel>
    </Card>
  );
}

export default withRouter(CategoryEditor);
