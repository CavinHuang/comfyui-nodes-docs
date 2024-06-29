---
tags:
- Text
---

# Save Text 🐍
## Documentation
- Class name: `SaveText|pysssss`
- Category: `utils`
- Output node: `False`

The SaveText node is designed for writing text to a file, with options to append to an existing file or create a new one. It abstracts the complexities of file handling, ensuring that text data is accurately saved according to the specified parameters.
## Input types
### Required
- **`root_dir`**
    - Specifies the root directory where the file will be saved. It is crucial for determining the file's save location and ensuring the file's path is correctly constructed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`file`**
    - The name of the file to save the text to. This parameter is essential for identifying the specific file to be written to or created.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`append`**
    - Controls whether the text should be appended to an existing file or a new file should be created. It affects how the text is saved, either by adding to the existing content or starting fresh.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`insert`**
    - Determines if a newline should be inserted before appending text to an existing file. It influences the formatting of the appended text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`text`**
    - The text content to be written to the file. This parameter is central to the node's functionality, as it specifies the actual data to be saved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the text that was written to the file, providing feedback on the operation's success.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveText(TextFileNode):
    @classmethod
    def IS_CHANGED(self, **kwargs):
        return float("nan")

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "root_dir": (list(get_valid_dirs()), {}),
                "file": ("STRING", {"default": "file.txt"}),
                "append": (["append", "overwrite", "new only"], {}),
                "insert": ("BOOLEAN", {
                    "default": True, "label_on": "new line", "label_off": "none",
                    "pysssss.binding": [{
                        "source": "append",
                        "callback": [{
                            "type": "if",
                            "condition": [{
                                "left": "$source.value",
                                "op": "eq",
                                "right": '"append"'
                            }],
                            "true": [{
                                "type": "set",
                                "target": "$this.disabled",
                                "value": False
                            }],
                            "false": [{
                                "type": "set",
                                "target": "$this.disabled",
                                "value": True
                            }],
                        }]
                    }]
                }),
                "text": ("STRING", {"forceInput": True, "multiline": True})
            },
        }

    FUNCTION = "write_text"

    def write_text(self, **kwargs):
        self.file = get_file(kwargs["root_dir"], kwargs["file"])
        if kwargs["append"] == "new only" and os.path.exists(self.file):
            raise FileExistsError(
                self.file + " already exists and 'new only' is selected.")
        with open(self.file, "a+" if kwargs["append"] == "append" else "w") as f:
            is_append = f.tell() != 0
            if is_append and kwargs["insert"]:
                f.write("\n")
            f.write(kwargs["text"])

        return super().load_text(**kwargs)

```
