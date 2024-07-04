
# Documentation
- Class name: ArgosTranslateTextNode
- Category: AlekPet Nodes/text
- Output node: False

ArgosTranslateTextNode是一个专门用于文本翻译的节点，它利用Argos Translate库的功能进行语言转换。该节点旨在提供准确高效的语言翻译服务，支持广泛的语言类型。

# Input types
## Required
- from_translate
    - 指定翻译的源语言代码，决定了文本将从哪种语言进行翻译。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- to_translate
    - 定义翻译的目标语言代码，表示文本将被翻译成哪种语言。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 需要翻译的文本，以字符串形式提供。这是将要进行翻译的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 翻译后的文本，以字符串形式返回。这个输出反映了文本从源语言到目标语言翻译后的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
