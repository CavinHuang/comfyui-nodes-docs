
# Documentation
- Class name: DF_To_text_(Debug)
- Category: Derfuu_Nodes/Debug
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DF_To_text_(Debug)节点是一个调试工具，它允许用户打印并检查传递给它的任何数据。该节点将输入数据转换为字符串表示形式，便于在节点执行过程中检查数据结构、变量或其他任何信息。通过提供输入数据的清晰文本输出，该节点有助于在工作流程中识别问题或验证数据处理步骤。

# Input types
## Required
- ANY
    - 接受任何类型的数据用于调试目的。它允许用户检查传递给节点的数据的内容和结构，有助于调试和数据验证任务。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- SAME AS INPUT
    - 返回未经改变的原始输入数据，便于在工作流程中进行进一步处理或检查。
    - Comfy dtype: *
    - Python dtype: Any
- STRING
    - 返回输入数据的字符串表示形式，或者如果在处理过程中发生错误，则返回异常消息。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - 提供一个用户界面元素，显示输入数据的文本表示或处理过程中遇到的任何异常。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ShowDataDebug:
    CATEGORY = TREE_DEBUG

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "ANY": Field.any(),
            },
        }

    RETURN_TYPES = (ANY, "STRING", )
    RETURN_NAMES = ("SAME AS INPUT", "STRING", )
    OUTPUT_NODE = True
    IS_CHANGED = True
    FUNCTION = "func"

    def func(self, ANY = None):
        out = ANY
        try:
            out = str(out)
            print(colorize(f"[DEBUG]: {ANY}", ConsoleColor.blue.value))
        except Exception as e:
            print(colorize(f"[DEBUG-EXCEPTION]: {e}", ConsoleColor.bold_red.value))
            out = str(e)
        return {"ui": {"text": [out]}, "result": (ANY, out)}

```
