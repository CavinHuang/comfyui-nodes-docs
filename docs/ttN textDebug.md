
# Documentation
- Class name: ttN textDebug
- Category: ttN/text
- Output node: True

ttN textDebug 节点是为调试目的而设计的，允许开发者在开发环境中检查和显示基于文本的输入数据。它是一个用于验证文本输入内容和结构的工具，有助于识别和解决文本处理工作流程中的问题。

# Input types
## Required
- print_to_console
    - 决定是否将文本打印到控制台，为调试目的提供了一种直接查看文本输出的方式。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- console_title
    - 指定调试过程中在控制台显示的标题，作为调试会话的标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- execute
    - 控制何时应执行调试操作，允许基于变化或持续监控进行条件调试。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 要调试的文本内容，提供将被检查和可能显示的实际数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 输入用于调试的文本，可能根据调试过程进行了修改或注释。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_textDebug:
    version = '1.0.'
    def __init__(self):
        self.num = 0

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "print_to_console": ([False, True],),
                    "console_title": ("STRING", {"default": ""}),
                    "execute": (["Always", "On Change"],),
                    "text": ("STRING", {"default": '', "multiline": True, "forceInput": True, "dynamicPrompts": True}),
                    },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                           "ttNnodeVersion": ttN_textDebug.version},
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "write"
    OUTPUT_NODE = True

    CATEGORY = "ttN/text"

    def write(self, print_to_console, console_title, execute, text, prompt, extra_pnginfo, my_unique_id):
        if execute == "Always":
            def IS_CHANGED(self):
                self.num += 1 if self.num == 0 else -1
                return self.num
            setattr(self.__class__, 'IS_CHANGED', IS_CHANGED)

        if execute == "On Change":
            if hasattr(self.__class__, 'IS_CHANGED'):
                delattr(self.__class__, 'IS_CHANGED')

        if print_to_console == True:
            if console_title != "":
                ttNl(text).t(f'textDebug[{my_unique_id}] - {CC.VIOLET}{console_title}').p()
            else:
                input_node = prompt[my_unique_id]["inputs"]["text"]

                input_from = None
                for node in extra_pnginfo["workflow"]["nodes"]:
                    if node['id'] == int(input_node[0]):
                        input_from = node['outputs'][input_node[1]].get('label')
                    
                        if input_from == None:
                            input_from = node['outputs'][input_node[1]].get('name')

                ttNl(text).t(f'textDebug[{my_unique_id}] - {CC.VIOLET}{input_from}').p()

        return {"ui": {"text": text},
                "result": (text,)}

```
