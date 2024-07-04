
# Documentation
- Class name: EnvironmentStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

EnvironmentStylerAdvanced节点是SDXLPromptStylerAdvanced的动态子类，为基于环境主题的文本提示提供高级样式功能。它利用预定义的模板集来修改和增强输入的文本提示，旨在生成的内容中反映特定的环境特征或主题。

# Input types
## Required
- text_positive_g
    - 要进行样式处理的正面文本提示的全局方面，侧重于增强其环境主题元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式处理的正面文本提示的局部方面，旨在强调特定的环境细节。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式处理的负面文本提示，旨在减轻或消除不需要的环境元素。
    - Comfy dtype: STRING
    - Python dtype: str
- environment
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定要应用的负面样式的范围，可以是全局、局部或两者兼有。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于启用或禁用提示样式处理过程的日志记录，提供有关所做选择及其对样式化提示影响的见解。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 样式化处理后的全局正面文本提示，富含环境主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 样式化处理后的局部正面文本提示，强调特定的环境细节。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 结合了全局和局部环境增强的样式化正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative_l
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative
    - 样式化处理后的负面文本提示，反映了对不需要的环境元素的减轻或消除。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
