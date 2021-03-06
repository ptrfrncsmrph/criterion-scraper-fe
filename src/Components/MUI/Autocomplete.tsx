import * as React from "react";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const Root = styled("div")(
  ({ theme }) => `
  color: white;
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  border: 1px solid whitesmoke;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  background-color: hsl(0, 1.6%, 12%);
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    border-color: dodger-blue;
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    border-color: dodger-blue;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    background-color: hsl(0, 1.6%, 12%);
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    color: white;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  background-color: hsl(0, 1.6%, 20%);
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border: hsl(0, 1.6%, 12%);
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    border-color: dodgerblue;
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    background-color: hsl(0, 1.6%, 24%);
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  background-color: hsl(0, 1.6%, 12%);
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    background-color: hsl(0, 1.6%, 20%);
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'], & .Mui-focused {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    background-color: hsl(0, 1.6%, 24%);
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

// TODO: Don't fix this to string
type Props<A extends string> = {
  readonly options: Array<A>;
  readonly getOptionLabel?: (a: A) => string;
  readonly value: Array<A>;
  readonly onChange: (as: Array<A>) => void;
  readonly label: string;
  // readonly inputValue: string;
  // readonly onInputChange: (input: string) => void;
};

// TODO: Don't fix this to string
export function autocomplete_<A extends string>(props: Props<A>) {
  const getOptionLabel = props.getOptionLabel ?? ((x: string) => x);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: props.options,
    getOptionLabel: (x) => x,
    onChange: (_e, value) => props.onChange(value),
    value: props.value,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{props.label}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: A, index: number) => (
            <StyledTag
              label={getOptionLabel(option)}
              {...getTagProps({ index })}
            />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as Array<A>).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{getOptionLabel(option)}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
