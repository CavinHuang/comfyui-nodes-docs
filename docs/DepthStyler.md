
# Documentation
- Class name: DepthStyler
- Category: ali1234/stylers
- Output node: False

DepthStyler 是一个专门设计用于对文本提示进行风格化处理的节点。它通过应用各种预定义的风格来美化文本提示，允许用户自定义提示的正面和负面方面。该节点支持通过菜单动态选择风格，使用户能够针对特定的生成任务调整提示的语气和内容。

# Input types
## Required
- text_positive
    - 需要进行风格化处理的正面提示文本。它作为自定义的基础内容，旨在增强或明确生成输出中所需的元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行风格化处理的负面提示文本。它指导模型避免某些元素或主题，作为正面提示的平衡。
    - Comfy dtype: STRING
    - Python dtype: str
- depth
    - 未知参数
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 一个布尔标志，用于启用或禁用提示转换和选择的日志记录。对于调试或跟踪提示变化如何影响风格化过程很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据所选风格修改的风格化正面提示文本，用于强调或明确所需元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 调整后的风格化负面提示文本，确保在生成的输出中避免某些元素或主题。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
