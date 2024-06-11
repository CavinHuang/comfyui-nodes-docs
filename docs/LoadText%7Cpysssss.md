# Load Text 🐍
## Documentation
- Class name: LoadText|pysssss
- Category: utils
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

LoadText节点用于从指定目录中的文件加载文本内容。它有助于检索文本数据，使其在工作流程中进一步处理或显示。

## Input types
### Required
- root_dir
    - 指定将从中加载文件的目录。对于定位文件并确保使用正确的路径进行文件访问至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- file
    - 要加载的特定文件。此参数对于确定要检索和加载的文本文件的内容至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- string
    - Comfy dtype: STRING
    - 返回指定文本文件的内容，作为字符串。
    - Python dtype: str

## Usage tips
- Infra type: CPU
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