
# Documentation
- Class name: AzazealStylesStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/ali1234/comfyui-stylers

AzazealStylesStyler节点根据预定义风格列表中的选择，动态地为文本提示应用特定的美学或主题风格。它通过融入风格元素来增强原始文本提示，旨在实现更有针对性或细微的表达。

# Input types
## Required
- text_positive
    - 待风格化的原始正面文本提示。它作为基础内容，将根据所选风格进行增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 待风格化的原始负面文本提示。它作为正面提示的对应部分，两者都将根据所选风格进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- Azazeal Styles
    - 指定要应用于文本提示的特定风格，从预定义的风格列表中选择。这一选择决定了对提示进行的风格调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志，当设为true时，启用提示风格化过程的日志记录，用于调试或验证目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 风格化后的正面文本提示，反映了预期的主题增强效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 风格化后的负面文本提示，展示了应用的美学或主题元素。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
