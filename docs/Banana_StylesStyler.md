
# Documentation
- Class name: Banana_StylesStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Banana Styles Styler节点根据用户从预定义集合中选择的样式，动态地将各种样式选项应用于文本提示。它通过利用定制化的模板集合，增强或修改原始文本提示，以反映特定的美学或主题选择。

# Input types
## Required
- text_positive
    - 要进行样式化的正面文本提示。它作为基础内容，将根据所选的样式选项进行增强或修改，影响整体的主题或美学输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化的负面文本提示。该输入与正面提示配合使用，通过潜在的对比或补充正面提示的修改，允许对样式进行微妙的处理。
    - Comfy dtype: STRING
    - Python dtype: str
- banana_styles
    - 可供用户应用于文本提示的样式选项集合。该参数允许对文本的外观进行自定义，反映所选的美学或主题风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- log_prompt
    - 一个布尔标志，当启用时，会记录原始和样式化后的提示，以及用户的菜单选择。这有助于调试和理解所选样式对文本的影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 正面文本提示的样式化版本，反映了应用的样式选项。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的样式化版本，展示了基于所选样式进行的修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
