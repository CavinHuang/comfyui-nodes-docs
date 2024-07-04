
# Documentation
- Class name: SubjectStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/alyssaxvo/ComfyUI-Custom-Nodes

SubjectStyler节点用于根据预定义的"主题"风格集动态地为文本提示词应用主题样式。它通过融入主题特定的风格元素来增强文本提示词，旨在实现更有针对性和精炼的内容生成。

# Input types
## Required
- text_positive
    - 需要进行风格化的文本提示词的正面方面。它在引导风格化过程以增强所需主题元素方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行风格化的文本提示词的负面方面。它用于平衡或避免某些主题，确保风格化过程集中在所需的主题上。
    - Comfy dtype: STRING
    - Python dtype: str
- subject
    - 在风格化过程中要应用的特定主题。这个参数决定了对文本提示词进行主题方向和风格调整的方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于指示是否记录风格化过程的详细信息。这有助于调试和理解所选主题如何影响最终的风格化提示词。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 反映应用主题风格后的文本提示词的正面方面。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 同样受所选主题影响的文本提示词的负面方面。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
