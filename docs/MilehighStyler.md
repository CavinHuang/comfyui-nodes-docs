
# Documentation
- Class name: MilehighStyler
- Category: ali1234/stylers
- Output node: False

MilehighStyler节点根据用户从预定义样式集中的选择，动态生成并应用各种样式选项到文本提示中。它利用一系列模板来修改和增强文本输入，旨在根据特定的美学或主题偏好定制内容。

# Input types
## Required
- text_positive
    - 用于样式化的正面文本提示。它在确定最终样式化输出中起着至关重要的作用，提供了将根据所选样式进行增强的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 用于样式化的负面文本提示。这个输入用于指定应以与正面提示相对比的方式进行样式化的内容，允许生成细致和平衡的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- milehigh
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 一个布尔标志，启用时，会记录输入提示及其样式化版本，用于调试或分析目的。这有助于理解所选样式如何应用于文本输入。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据用户选择进行样式化的正面文本提示的增强版本。它代表了对原始输入应用美学或主题修改的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 根据用户选择以与正面提示相对比的方式进行样式化的负面文本提示的增强版本。这个输出展示了样式化过程在生成多样化内容方面的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
