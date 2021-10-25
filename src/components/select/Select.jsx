import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './select.scss';

const codeKeys = {
  SPACE: 32,
  ENTER: 13,
  DOWN_ARROW: 40,
}

const Select = ({ options, label, onSelect: handler, renderOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topOverlay, setTopOverlay] = useState(null);
  const [indexOption, setIndexOption] = useState(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef) {
      setTopOverlay(btnRef?.current?.offsetHeight + 5);
    }
  }, [btnRef?.current?.offsetHeight]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option, index) => {
    if (handler) {
      handler(option, index);
    }
    console.log('hello from generic component ...');
    setIsOpen(false);
    setIndexOption(index);
  };

  const handleKeyDown = (event) => {
  console.log("🚀 ~ file: Select.jsx ~ line 38 ~ handleKeyDown ~ event", event)
    event.preventDefault();
    if(Object.values(codeKeys).includes(event.keyCode)){
      setIsOpen(true);
      setIndexOption((prev) => prev === null ? 0 : prev < options.length ? prev + 1 : 0)
    }
  }

  return (
    <div className="wh--select">
      <button
        onKeyDown={handleKeyDown}
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="wh-select-list"
        ref={btnRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <span>{label}</span>
        <svg
          className={`wh-svg wh-svg${isOpen ? '__open' : '__close'}`}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id="wh-select-list"
          role="menu"
          aria-hidden={isOpen ? undefined : true}
          className={`wh--select__options ${
            isOpen ? 'wh--select__options__open' : 'wh--select__options__close'
          }`}
          style={{ top: `${topOverlay}px` }}
        >
          {options?.map((option, index) => {
            return (
              <li
                className={`wh--select__options__item ${
                  indexOption === index
                    ? 'wh--select__options__item__selected'
                    : ''
                }`}
                key={index}
                onClick={() => handleSelect(option, index)}
              >
                {renderOption ? renderOption() : option?.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  renderOption: PropTypes.func,
  label: PropTypes.string,
};

export default Select;
