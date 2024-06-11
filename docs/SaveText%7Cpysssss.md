# Save Text 🐍
## Documentation
- Class name: SaveText|pysssss
- Category: utils
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

SaveText节点用于将文本写入文件，并提供附加到现有文件或创建新文件的选项。它抽象了文件处理的复杂性，确保根据指定参数准确保存文本数据。

## Input types
### Required
- root_dir
    - 指定文件将保存到的根目录。对于确定文件的保存位置并确保文件路径正确构建至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- file
    - 要保存文本的文件的名称。此参数对于确定要写入或创建的特定文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- append
    - 控制文本是应附加到现有文件还是应创建新文件。它影响文本的保存方式，是通过添加到现有内容还是重新开始。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- insert
    - 决定在附加文本到现有文件之前是否应插入换行符。它影响附加文本的格式。
    - Comfy dtype: BOOLEAN
    - Python dtype: str
- text
    - 要写入文件的文本内容。此参数是节点功能的核心，因为它指定要保存的实际数据。
    - Comfy dtype: STRING
    - Python dtype: str

## Output types
- string
    - Comfy dtype: STRING
    - 返回写入文件的文本，提供操作成功的反馈。
    - Python dtype: str

## Usage tips
- Infra type: CPU
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