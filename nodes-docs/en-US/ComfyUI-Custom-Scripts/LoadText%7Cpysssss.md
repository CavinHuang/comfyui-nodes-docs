---
tags:
- Text
---

# Load Text 🐍
## Documentation
- Class name: `LoadText|pysssss`
- Category: `utils`
- Output node: `False`

The LoadText node is designed for loading text content from a specified file within a given directory. It facilitates the retrieval of text data, enabling further processing or display within a workflow.
## Input types
### Required
- **`root_dir`**
    - Specifies the directory from which the file will be loaded. It is crucial for locating the file and ensuring the correct path is used for file access.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`file`**
    - The specific file to be loaded. This parameter is essential for identifying which text file's contents are to be retrieved and loaded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the content of the specified text file as a string.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadText(TextFileNode):
    @classmethod
    def IS_CHANGED(self, **kwargs):
        return os.path.getmtime(self.file)

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "root_dir": (list(get_valid_dirs()), {}),
                "file": (["[none]"], {
                    "pysssss.binding": [{
                        "source": "root_dir",
                        "callback": [{
                            "type": "set",
                            "target": "$this.disabled",
                            "value": True
                        }, {
                            "type": "fetch",
                            "url": "/pysssss/text-file/{$source.value}",
                            "then": [{
                                "type": "set",
                                "target": "$this.options.values",
                                "value": "$result"
                            }, {
                                "type": "validate-combo"
                            }, {
                                "type": "set",
                                "target": "$this.disabled",
                                "value": False
                            }]
                        }],
                    }]
                })
            },
        }

    FUNCTION = "load_text"

```
