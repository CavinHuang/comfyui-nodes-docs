
# Documentation
- Class name: FilterStyler
- Category: ali1234/stylers
- Output node: False

FilterStyler节点根据用户从预定义菜单中选择的滤镜，动态地对文本提示进行风格修改。它利用一系列模板来转换输入的提示，旨在根据所选的滤镜选项增强或改变其风格属性。

# Input types
## Required
- text_positive
    - 需要进行风格化处理的正面文本提示。它作为风格修改的基础内容，通过应用选定的风格滤镜影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行风格化处理的负面文本提示。与正面提示类似，它根据选定的滤镜进行风格修改，影响输出的整体风格。
    - Comfy dtype: STRING
    - Python dtype: str
- filter
    - 指定用于对文本提示进行风格化处理的滤镜。这个选择决定了将应用于正面和负面提示的风格转换。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于控制是否记录输入和风格化后的提示，以便进行调试或验证。启用时，它会记录提示的前后状态以及选定的滤镜。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据选定的风格滤镜转换后的正面文本提示的风格化版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 同样根据应用的风格滤镜转换的负面文本提示的风格化版本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
