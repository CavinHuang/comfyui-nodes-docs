
# Documentation
- Class name: GoogleTranslateTextNode
- Category: AlekPet Nodes/text
- Output node: False

该节点提供了将文本从一种语言翻译成另一种语言的功能，并提供了手动跳过翻译的选项。它可以根据配置使用Google Translate API或内置翻译器来执行翻译。

# Input types
## Required
- from_translate
    - 指定翻译的源语言代码。如果设置为'auto'，将自动检测源语言。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- to_translate
    - 指定翻译的目标语言代码。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- manual_translate
    - 一个布尔标志，当设为true时，将跳过翻译过程并返回原始文本。对于手动控制翻译过程很有用。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- text
    - 需要翻译的文本。支持多行输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 翻译后的文本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
