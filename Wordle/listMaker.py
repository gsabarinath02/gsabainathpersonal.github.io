word_list = []
with open("Wordle\words.txt", "r") as input_file:
    for line in input_file:
        word = line.strip()
        word_list.append(word)
        # print(word_list)

with open("Wordle\list.txt", "w") as output_file:
    output_file.write(str(word_list))

with open("Wordle\list.txt", "r") as input_file:
    word_list = eval(input_file.read())

