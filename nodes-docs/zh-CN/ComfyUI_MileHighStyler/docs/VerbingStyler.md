
# Documentation
- Class name: VerbingStyler
- Category: ali1234/stylers
- Output node: False

VerbingStyler节点能够根据其菜单中定义的样式选项动态地对文本输入进行风格转换。它通过应用预定义的模板来定制文本提示，从而增强生成内容的表现力和主题深度。

# Input types
## Required
- text_positive
    - 需要进行样式处理的正面文本，作为风格转换的基础内容，影响输出的整体主题呈现。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行样式处理的负面文本，根据选定的样式选项进行转换，改变其主题和表现特质。
    - Comfy dtype: STRING
    - Python dtype: str
- verbing
    - 指定要应用的样式选项，允许对文本进行定制和主题调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: dict
- log_prompt
    - 一个布尔标志，启用时会记录样式选择以及文本的前后状态，有助于调试和优化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 经过样式处理的正面文本，反映了所应用的风格转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 完全经过样式处理的负面文本，体现了样式处理过程中产生的主题和表现上的变化。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
