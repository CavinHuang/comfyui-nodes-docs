
# Documentation
- Class name: Clothing_StateStyler
- Category: ali1234/stylers
- Output node: False

Clothing_StateStyler节点根据预定义的服装状态模板动态地对文本提示进行样式设置。它利用一系列样式模板来修改和增强文本输入，旨在生成的文本中反映特定的服装风格或状态。

# Input types
## Required
- text_positive
    - 需要进行样式设置的正面文本输入，表示应根据服装状态样式模板进行增强或修改的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行样式设置的负面文本输入，表示可能会被服装状态样式模板负面影响或改变的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- clothing_state
    - 指定要应用于文本提示的特定服装状态，引导样式设置过程以反映特定的服装风格或条件。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，指示是否记录输入和输出提示，用于调试或跟踪目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据所选服装状态样式模板修改后的样式化正面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 反映服装状态样式模板影响后的样式化负面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
