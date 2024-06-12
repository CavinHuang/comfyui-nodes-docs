# Documentation
- Class name: WAS_Text_Compare
- Category: WAS Suite/Text/Search
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Compare节点旨在比较两个文本输入，并根据指定的模式确定它们的相似性或差异性。它通过分析文本内容并提供反映相似度或差异度的分数来操作。该节点多功能，可用于需要文本比较的各种应用中，例如抄袭检测或内容匹配。

# Input types
## Required
- text_a
    - 要与第二个文本输入进行比较的第一个文本输入。它在比较过程中起着至关重要的作用，因为它构成了确定相似性或差异性的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 与第一个文本输入进行比较的第二个文本输入。它对于比较至关重要，因为它为分析提供了对比内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- mode
    - 模式决定了比较应该侧重于两个文本之间的相似性还是差异性。它影响用于比较的算法以及产生的结果类型。
    - Comfy dtype: COMBO['similarity', 'difference']
    - Python dtype: str
- tolerance
    - 容差级别设置了确定相似度的阈值。当节点用于查找几乎相同的文本时特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- TEXT_A_PASS
    - 被比较的第一个文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- TEXT_B_PASS
    - 被比较的第二个文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- BOOLEAN
    - 一个布尔值，指示文本是否完全相同。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- SCORE_NUMBER
    - 一个数值分数，代表两个文本之间的相似度或差异度。
    - Comfy dtype: NUMBER
    - Python dtype: float
- COMPARISON_TEXT
    - 比较结果的文本表示，突出显示差异或相似之处。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Compare:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text_a': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'text_b': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'mode': (['similarity', 'difference'],), 'tolerance': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE, 'BOOLEAN', 'NUMBER', TEXT_TYPE)
    RETURN_NAMES = ('TEXT_A_PASS', 'TEXT_B_PASS', 'BOOLEAN', 'SCORE_NUMBER', 'COMPARISON_TEXT')
    FUNCTION = 'text_compare'
    CATEGORY = 'WAS Suite/Text/Search'

    def text_compare(self, text_a='', text_b='', mode='similarity', tolerance=0.0):
        boolean = 1 if text_a == text_b else 0
        sim = self.string_compare(text_a, text_b, tolerance, True if mode == 'difference' else False)
        score = float(sim[0])
        sim_result = ' '.join(sim[1][::-1])
        sim_result = ' '.join(sim_result.split())
        return (text_a, text_b, bool(boolean), score, sim_result)

    def string_compare(self, str1, str2, threshold=1.0, difference_mode=False):
        m = len(str1)
        n = len(str2)
        if difference_mode:
            dp = [[0 for x in range(n + 1)] for x in range(m + 1)]
            for i in range(m + 1):
                for j in range(n + 1):
                    if i == 0:
                        dp[i][j] = j
                    elif j == 0:
                        dp[i][j] = i
                    elif str1[i - 1] == str2[j - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
                    else:
                        dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
            diff_indices = []
            (i, j) = (m, n)
            while i > 0 and j > 0:
                if str1[i - 1] == str2[j - 1]:
                    i -= 1
                    j -= 1
                else:
                    diff_indices.append(i - 1)
                    (i, j) = min((i, j - 1), (i - 1, j))
            diff_indices.reverse()
            words = []
            start_idx = 0
            for i in diff_indices:
                if str1[i] == ' ':
                    words.append(str1[start_idx:i])
                    start_idx = i + 1
            words.append(str1[start_idx:m])
            difference_score = 1 - (dp[m][n] - len(words)) / max(m, n)
            return (difference_score, words[::-1])
        else:
            dp = [[0 for x in range(n + 1)] for x in range(m + 1)]
            similar_words = set()
            for i in range(m + 1):
                for j in range(n + 1):
                    if i == 0:
                        dp[i][j] = j
                    elif j == 0:
                        dp[i][j] = i
                    elif str1[i - 1] == str2[j - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
                        if i > 1 and j > 1 and (str1[i - 2] == ' ') and (str2[j - 2] == ' '):
                            word1_start = i - 2
                            word2_start = j - 2
                            while word1_start > 0 and str1[word1_start - 1] != ' ':
                                word1_start -= 1
                            while word2_start > 0 and str2[word2_start - 1] != ' ':
                                word2_start -= 1
                            word1 = str1[word1_start:i - 1]
                            word2 = str2[word2_start:j - 1]
                            if word1 in str2 or word2 in str1:
                                if word1 not in similar_words:
                                    similar_words.add(word1)
                                if word2 not in similar_words:
                                    similar_words.add(word2)
                    else:
                        dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
                    if dp[i][j] <= threshold and i > 0 and (j > 0):
                        word1_start = max(0, i - dp[i][j])
                        word2_start = max(0, j - dp[i][j])
                        word1_end = i
                        word2_end = j
                        while word1_start > 0 and str1[word1_start - 1] != ' ':
                            word1_start -= 1
                        while word2_start > 0 and str2[word2_start - 1] != ' ':
                            word2_start -= 1
                        while word1_end < m and str1[word1_end] != ' ':
                            word1_end += 1
                        while word2_end < n and str2[word2_end] != ' ':
                            word2_end += 1
                        word1 = str1[word1_start:word1_end]
                        word2 = str2[word2_start:word2_end]
                        if word1 in str2 or word2 in str1:
                            if word1 not in similar_words:
                                similar_words.add(word1)
                            if word2 not in similar_words:
                                similar_words.add(word2)
            if max(m, n) == 0:
                similarity_score = 1
            else:
                similarity_score = 1 - dp[m][n] / max(m, n)
            return (similarity_score, list(similar_words))
```