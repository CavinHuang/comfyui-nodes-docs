
# Documentation
- Class name: ThemeStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ThemeStyler节点根据预定义的主题选择，动态地为文本提示词应用主题样式。它修改输入文本以反映所选主题，从而增强提示词的表现力和特异性，用于生成具有特定风格的内容。

# Input types
## Required
- text_positive
    - 要进行样式化处理的文本提示词的正面部分。它影响生成内容的主题方向和基调。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化处理的文本提示词的负面部分。它用于细化和对比所应用的主题样式，确保输出结果平衡且富有细微差别。
    - Comfy dtype: STRING
    - Python dtype: str
- theme
    - 用于设置文本提示词样式的特定主题。这个选择决定了注入文本中的主题元素和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- log_prompt
    - 一个用于启用或禁用提示词样式化过程日志记录的标志，有助于调试和优化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 经过样式化处理的文本提示词的正面部分，已转化为体现所选主题的形式。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 经过样式化处理的文本提示词的负面部分，已调整以补充正面文本的主题样式。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
