
# Documentation
- Class name: AdjectiveStyler
- Category: ali1234/stylers
- Output node: False

AdjectiveStyler节点通过基于一系列风格化形容词的选择来动态定制文本提示。它允许用户通过菜单驱动的界面来增强或修改其文本输入的语气和特征。

# Input types
## Required
- text_positive
    - 定义初始的正面文本提示以供样式化。它作为基础内容，将根据所选的风格化形容词进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 定义初始的负面文本提示以供样式化。它作为基础内容，将根据所选的风格化形容词进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- adjective
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 控制是否记录样式化过程和选择，有助于调试或回顾所做的样式化选择。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据所选形容词样式化后的修改后的正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 根据所选形容词样式化后的修改后的负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
