
# Documentation
- Class name: FaceStyler
- Category: ali1234/stylers
- Output node: False

FaceStyler节点专门用于对图像中的面部特征应用特定的风格效果。它利用预定义的风格集合，根据用户选择的选项来增强或改变面部的外观。

# Input types
## Required
- text_positive
    - 指定影响造型过程的正面文本内容，有助于在图像中生成带有风格的面部特征。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 指定影响造型过程的负面文本内容，用于抵消某些风格或特征，以生成带有风格的面部图像。
    - Comfy dtype: STRING
    - Python dtype: str
- face
    - 包含需要进行风格化处理的面部的输入图像，作为应用风格效果的直接对象。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Image
- log_prompt
    - 一个布尔标志，当启用时，会记录风格选择和文本内容输入，用于调试或信息目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 反映所应用的正面风格效果的输出文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 反映所应用的负面风格效果的输出文本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
