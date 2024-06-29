---
tags:
- AnimationScheduling
- Curve
---

# ⌗ CSV Generator
## Documentation
- Class name: `CSV Generator [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `True`

The CSV Generator node is designed for creating and appending data to a CSV file, specifically tailored for animation curve data. It initializes or updates a CSV file with frame and value data, supporting custom CSV dialects for flexible file formatting.
## Input types
### Required
- **`frame_counter`**
    - Tracks the current frame in the animation, ensuring accurate timing data is recorded alongside values in the CSV.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`value`**
    - Specifies the numerical value to be recorded in the CSV file, playing a crucial role in the animation curve's data points.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`csvfile`**
    - The path to the CSV file to be created or updated, serving as the primary storage for the animation curve data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`csv_dialect`**
    - Defines the formatting rules for the CSV file, allowing customization of the file's structure and syntax.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamCSVGenerator:
    NODE_NAME = "CSV Generator"
    ICON = "⌗"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "value": ("FLOAT", {"forceInput": True, "default": 0.0}),
                "csvfile": ("STRING", {"default": "", "multiline": False}),
                "csv_dialect": (csv.list_dialects(),)
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = "write"
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def write(self, csvfile, frame_counter: FrameCounter, value, csv_dialect):
        if frame_counter.is_first_frame and csvfile:
            with open(csvfile, 'w', newline='') as csvfile:
                csvwriter = csv.writer(csvfile, dialect=csv_dialect)
                csvwriter.writerow(['Frame', 'Value'])
                csvwriter.writerow([frame_counter.current_frame, str(value)])
        else:
            with open(csvfile, 'a', newline='') as csvfile:
                csvwriter = csv.writer(csvfile, dialect=csv_dialect)
                csvwriter.writerow([frame_counter.current_frame, str(value)])
        return ()

```
