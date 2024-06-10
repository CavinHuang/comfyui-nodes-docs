---
tags:
- Style
---

# Styles Loader (mtb)
## Documentation
- Class name: `Styles Loader (mtb)`
- Category: `mtb/conditioning`
- Output node: `False`

The MTB_StylesLoader node is designed to manage and provide access to various styles for conditioning, enabling the selection and application of predefined styles to modify or enhance content generation processes.
## Input types
### Required
- **`style_name`**
    - Specifies the name of the style to be loaded. This parameter is crucial for identifying and retrieving the specific style's attributes from a collection of available styles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - Returns the positive aspect of the selected style, which is part of the style's characteristics.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - Returns the negative aspect of the selected style, which is another part of the style's characteristics.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_StylesLoader:
    """Load csv files and populate a dropdown from the rows (à la A111)"""

    options = {}

    @classmethod
    def INPUT_TYPES(cls):
        if not cls.options:
            input_dir = Path(folder_paths.base_path) / "styles"
            if not input_dir.exists():
                install_default_styles()

            if not (
                files := [f for f in input_dir.iterdir() if f.suffix == ".csv"]
            ):
                log.warn(
                    "No styles found in the styles folder, place at least one csv file in the styles folder at the root of ComfyUI (for instance ComfyUI/styles/mystyle.csv)"
                )

            for file in files:
                with open(file, encoding="utf8") as f:
                    parsed = csv.reader(f)
                    for i, row in enumerate(parsed):
                        log.debug(f"Adding style {row[0]}")
                        try:
                            name, positive, negative = (row + [None] * 3)[:3]
                            positive = positive or ""
                            negative = negative or ""
                            if name is not None:
                                cls.options[name] = (positive, negative)
                            else:
                                # Handle the case where 'name' is None
                                log.warning(f"Missing 'name' in row {i}.")

                        except Exception as e:
                            log.warning(
                                f"There was an error while parsing {file}, make sure it respects A1111 format, i.e 3 columns name, positive, negative:\n{e}"
                            )
                            continue

        else:
            log.debug(f"Using cached styles (count: {len(cls.options)})")

        return {
            "required": {
                "style_name": (list(cls.options.keys()),),
            }
        }

    CATEGORY = "mtb/conditioning"

    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "load_style"

    def load_style(self, style_name):
        return (self.options[style_name][0], self.options[style_name][1])

```
