---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# Print Floats (klinter)
## Documentation
- Class name: `PrintFloats`
- Category: `Utils`
- Output node: `False`

The PrintFloats node is designed to convert a float or an array of floats into a string representation, ensuring a proper format without extra line breaks. It focuses on formatting numerical values for display or logging purposes, accommodating both individual floats and collections thereof.
## Input types
### Required
- **`audio_float`**
    - Represents the float or array of floats to be converted into a string format. This input is crucial for determining the exact numerical values that will be formatted and returned as strings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[float, np.ndarray]`
## Output types
- **`formatted_float`**
    - Comfy dtype: `STRING`
    - The string representation of the input float(s), formatted to two decimal places. This output is essential for displaying or logging numerical values in a consistent and readable format.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PrintFloats:
    """Class to convert a float or an array of floats to a string representation, ensuring proper format without extra line breaks."""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"audio_float": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000000.0, "forceInput": True})}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("formatted_float",)
    FUNCTION = "convert"
    CATEGORY = "Utils"  # Simplified category for demonstration

    def convert(self, audio_float):
        # Ensure the correct handling of both single float and arrays of floats
        if isinstance(audio_float, np.ndarray):
            # Process each float in the array and join with a newline
            formatted_float = '\n'.join(f"{x:.2f}" for x in audio_float)
        else:
            # Process a single float
            formatted_float = f"{audio_float:.2f}"

        return (formatted_float,)

```
