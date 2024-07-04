
# Documentation
- Class name: Breast_StateStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Breast_StateStyler节点根据用户选择的样式选项动态自定义文本提示，从而增强输出的特异性和创造性。它利用全面的样式数据库对文本输入进行细微修改，从而使生成过程与用户偏好和主题要求保持一致。

# Input types
## Required
- text_positive
    - 'text_positive'输入代表初始的正面文本提示，节点将根据选定的样式选项对其进行修改。它通过提供将被增强的基础内容，在塑造最终样式化输出中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 'text_negative'输入是初始的负面文本提示，节点将根据所选的样式偏好对其进行调整。它对于通过指定应最小化或避免的主题或元素来细化输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- breast_state
    - 'breast_state'输入指定了样式选项应强调或弱化的特定乳房状态或条件，在定制输出以满足特定主题或内容要求方面发挥关键作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 'log_prompt'输入启用样式处理过程的日志记录，包括原始提示和所做的选择，提供了样式选择如何影响最终输出的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 修改后的正面文本提示，反映了应用的样式选择。它展示了节点基于用户偏好增强和个性化文本生成的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 调整后的负面文本提示，表明样式偏好对最小化或避免某些主题或元素的影响。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
