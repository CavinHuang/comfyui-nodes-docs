
# Documentation
- Class name: Fans Prompt Styler Positive
- Category: utils
- Output node: False

该节点旨在根据选定的积极风格来修改和增强文本提示。它允许将风格元素动态整合到用户定义的提示中，目的是使输出文本适应特定的美学或主题偏好。

# Input types
## Required
- style
    - "style"参数允许用户从预定义列表中选择特定风格以应用于他们的提示。这个选择决定了提示将经历的风格转换，影响输出的整体基调和呈现方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prompt
    - "prompt"参数接受用户定义的文本输入，作为风格增强的基础内容。这个输入至关重要，因为它构成了应用所选风格的基础，直接影响最终输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 输出的"result"是经过转换的提示文本，根据用户的美学或主题偏好，将所选风格整合到原始输入中进行修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansPromptStylerPositive:
    styles = None

    def __init__(self):
        pass
    
    def handle_prompt_change(self, value):
        print("New prompt value:", value)
    
    @classmethod
    def INPUT_TYPES(cls):
        if not os.path.exists(csv_file_path):
            cls.styles = [["No Styles.csv", "", ""]]
        else:
            with open(csv_file_path, "r") as f:
                reader = csv.reader(f, dialect='excel')
                cls.styles = [row for row in reader if len(row) == 2 and row[1] != "prompt" and row[0] != "None"]

        cls.styles.insert(0, ["None", "", ""])
        style_names = [row[0] for row in cls.styles]

        return {
            "required": {
                "style": (style_names, {"default": style_names[0]}),
                "prompt": ("STRING", {"multiline": True, "default": "Input Your Prompt Here"}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("result",)
    FUNCTION = "func"
    OUTPUT_NODE = False
    CATEGORY = "utils"

    def func(self, style, prompt):
        result=""

        if style=="None":
            result=prompt
        else:
            for row in self.styles:
                if row[0] == style:
                    result += row[1]              

            if "{prompt}" not in result:
                result =  prompt + " " + result
            else:
                result = result.replace("{prompt}", prompt)

        return result,

```
