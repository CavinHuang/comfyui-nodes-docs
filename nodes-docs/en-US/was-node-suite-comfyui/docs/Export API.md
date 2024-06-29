# Export API
## Documentation
- Class name: `Export API`
- Category: `WAS Suite/Debug`
- Output node: `True`

The Export API node is designed to facilitate the exporting of API configurations, including prompts and their associated settings, to a specified output path. It supports customization of the filename, optional parsing of text tokens, and the choice to save prompt configurations for future use.
## Input types
### Required
- **`save_prompt_api`**
    - Indicates whether the prompt configuration should be saved for future API calls, enabling easy reuse of configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_path`**
    - Specifies the destination path where the API configurations will be exported. This path determines where the exported files will be saved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_prefix`**
    - Defines the prefix for the filenames of the exported API configurations, allowing for easy identification and organization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_delimiter`**
    - Specifies the delimiter to be used in the filenames, separating different parts of the filename for clarity.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_number_padding`**
    - Determines the padding for numerical parts of the filename, ensuring consistent filename lengths and sorting order.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`parse_text_tokens`**
    - Determines whether text tokens within the prompt should be parsed, allowing for dynamic content generation based on the prompt.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Export_API:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "save_prompt_api": (["true","true"],),
                "output_path": ("STRING", {"default": "./ComfyUI/output/", "multiline": False}),
                "filename_prefix": ("STRING", {"default": "ComfyUI_Prompt"}),
                "filename_delimiter": ("STRING", {"default":"_"}),
                "filename_number_padding": ("INT", {"default":4, "min":2, "max":9, "step":1}),
                "parse_text_tokens": ("BOOLEAN", {"default": False})
            },
            "hidden": {
                "prompt": "PROMPT"
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = "export_api"

    CATEGORY = "WAS Suite/Debug"

    def export_api(self, output_path=None, filename_prefix="ComfyUI", filename_number_padding=4,
                    filename_delimiter='_', prompt=None, save_prompt_api="true", parse_text_tokens=False):
        delimiter = filename_delimiter
        number_padding = filename_number_padding if filename_number_padding > 1 else 4

        tokens = TextTokens()

        if output_path in [None, '', "none", "."]:
            output_path = comfy_paths.output_directory
        else:
            output_path = tokens.parseTokens(output_path)

        pattern = f"{re.escape(filename_prefix)}{re.escape(filename_delimiter)}(\\d{{{number_padding}}})"
        existing_counters = [
            int(re.search(pattern, filename).group(1))
            for filename in os.listdir(output_path)
            if re.match(pattern, filename)
        ]
        existing_counters.sort(reverse=True)

        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1

        file = f"{filename_prefix}{filename_delimiter}{counter:0{number_padding}}.json"
        output_file = os.path.abspath(os.path.join(output_path, file))

        if prompt:

            if parse_text_tokens:
                prompt = self.parse_prompt(prompt, tokens, keys_to_parse)

            prompt_json = json.dumps(prompt, indent=4)
            cstr("Prompt API JSON").msg.print()
            print(prompt_json)

            if save_prompt_api == "true":

                with open(output_file, 'w') as f:
                    f.write(prompt_json)

                cstr(f"Output file path: {output_file}").msg.print()

        return {"ui": {"string": prompt_json}}

    def parse_prompt(self, obj, tokens, keys_to_parse):
        if isinstance(obj, dict):
            return {
                key: self.parse_prompt(value, tokens, keys_to_parse)
                if key in keys_to_parse else value
                for key, value in obj.items()
            }
        elif isinstance(obj, list):
            return [self.parse_prompt(element, tokens, keys_to_parse) for element in obj]
        elif isinstance(obj, str):
            return tokens.parseTokens(obj)
        else:
            return obj

```
