
# Documentation
- Class name: FaceStylerAdvanced
- Category: ali1234/stylers
- Output node: False

FaceStylerAdvanced节点旨在利用深度学习模型对图像中的面部应用高级美化技术，根据指定的风格或参数来增强或改变面部特征。该节点的重点是为用户提供定制和精细化数字内容中面部外观的能力，提供一系列可动态应用的美化选项，以实现所需的美学效果。

# Input types
## Required
- text_positive_g
    - 该参数代表全局正面文本描述符或关键词，用于指导整体美化过程，通过指定要增强或引入的一般方面来影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 该参数侧重于局部正面文本描述符或关键词，允许对特定面部特征或区域进行更详细的指导，以根据美化偏好进行增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 捕获负面文本描述符或关键词，指示面部美化中要避免或最小化的方面，有助于引导输出远离不需要的特征或效果。
    - Comfy dtype: STRING
    - Python dtype: str
- face
    - 允许用户输入要美化的面部或多个面部，作为美化过程的直接对象。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_prompt_to
    - 指定负面提示的应用范围，可以是全局、局部或两者兼顾，从而影响负面描述符如何影响结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 用于日志记录目的，捕获用户描述所需面部美化结果的输入提示。它有助于根据用户反馈和偏好跟踪和优化美化过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: str

# Output types
- text_positive_g
    - 代表通过美化过程实现的全局增强效果，以正面文本描述符或关键词描述。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 捕获对特定面部特征或区域的局部增强效果，由详细的正面文本描述符指导。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative_g
    - 此输出捕获成功最小化或避免的面部美化的全局方面，如负面文本描述符或关键词所示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 代表成功最小化或避免的面部美化的局部方面，侧重于特定面部特征或区域。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - Comfy dtype: STRING
    - Python dtype: unknown


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
