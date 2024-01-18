SUITS = ('Club', 'Spade', 'Heart', 'Diamond')
RANKS = ('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K')
RANKS_CONVERTER = {'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
                   'J': 11, 'Q': 12, 'K': 13}
CARD_VALUES = {'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 
               'J': 10, 'Q': 10, 'K': 10}

def swap(i, j, list):
    temp = list[i]
    list[i] = list[j]
    list[j] = temp
class Hand:
    def __init__(self):
        self.cards = []
        # self.cards_sorted_by_suit stores the cards sorted by suit and then ranks
        self.cards_sorted_by_suit = []
        # self.cards[self.cards_suit_index[i]] is the ith card in self.cards_sorted_by_suit
        self.cards_suit_index = []
        self.melds = []
        self.deadwood = []
    
    def __str__(self):
        s = ''
        for card in self.cards:
            s += str(card) + ' '
        return s

    def change_lay_off_meld_num(self, index, num):
        self.cards[index].set_lay_off_meld_num(num)
    
    # finds index of a card in the hand
    def find_index(self, card):
        return self.cards.index(card)
    
    # replicate the hand
    def replicate(self, new_hand):
        for card in self.cards:
            new_hand.add_card(card)
    
    # calculate deadwood value for function find_best_meld_combo
    def calc_deadwood_value_for_unsorted(self):
        value = 0
        for card in self.cards:
            if not card.get_meld_status(): # the card is not in a meld
                value += CARD_VALUES[card.get_rank()]
        return value
    
    # calculate deadwood value for a sorted hand
    def calc_deadwood_value(self):
        value = 0
        for card in self.deadwood:
            value += CARD_VALUES[card.get_rank()]
        return value
    
    def add_card(self, new_card):
        self.cards.append(new_card)
    
    def insert_card(self, index, new_card):
        self.cards.insert(index, new_card)
    
    def discard(self, card_index):
        # Use the number of the card in the list to get the card
        # the player wants to discard and .pop() to return it
        return self.cards.pop(card_index)   
    
    # insert self.cards[index2] before self.cards[index1]
    def reorganize_card(self, index1, index2):
        self.cards.insert(index1, self.cards.pop(index2))
    
    # check if the mouse clicks on any card in the hand
    # if so, return the card index
    # if not, return "No Match Found"
    
    # sort self.cards according to ranks and then suits
    # selection sorting algorithm
    def sort_by_rank(self, start, end):
        for i in range(start, end - 1):
            for j in range(i + 1, end):
                rank1 = RANKS_CONVERTER[self.cards[i].get_rank()]
                rank2 = RANKS_CONVERTER[self.cards[j].get_rank()]
                suit1 = self.cards[i].get_suit()
                suit2 = self.cards[j].get_suit()
                if rank1 > rank2:
                    swap(i, j, self.cards)
                elif rank1 == rank2:
                    if SUITS.index(suit1) > SUITS.index(suit2):
                        swap(i, j, self.cards)
    
    # sort self.cards_sorted_by_suit according to suits and then ranks
    # selection sorting algorithm
    def sort_by_suit(self):
        for i in range(len(self.cards_sorted_by_suit) - 1):
            for j in range(i + 1, len(self.cards_sorted_by_suit)):
                rank1 = RANKS_CONVERTER[self.cards_sorted_by_suit[i].get_rank()]
                rank2 = RANKS_CONVERTER[self.cards_sorted_by_suit[j].get_rank()]
                suit1 = self.cards_sorted_by_suit[i].get_suit()
                suit2 = self.cards_sorted_by_suit[j].get_suit()
                if SUITS.index(suit1) > SUITS.index(suit2):
                    swap(i, j, self.cards_sorted_by_suit)
                    swap(i, j, self.cards_suit_index)
                elif SUITS.index(suit1) == SUITS.index(suit2):
                    if rank1 > rank2:
                        swap(i, j, self.cards_sorted_by_suit)
                        swap(i, j, self.cards_suit_index)
    
    # brute-force searching algorithm that finds the best meld combo in the current hand 
    # with the least number of deadwood
    def find_best_meld_combo(self, index):
        global meld_num, same_rank_meld_num, meld_num_freq, min_deadwood_val 
        global best_meld_index_list, card_meld_num_list
        if index == len(self.cards):
            # check failed same-suit melds and reset the meld_num of the cards in the
            # failed same-suit melds to -1 (meaning that these cards cannot form a meld)
            for num in range(same_rank_meld_num, meld_num):
                index_list = []
                for card in self.cards:
                    if card.get_meld_num() == num:
                        index_list.append(self.cards.index(card))
                meld_failed = False
                i = 0
                while not meld_failed and i < len(index_list)- 1:
                    rank1 = RANKS_CONVERTER[self.cards[index_list[i]].get_rank()]
                    rank2 = RANKS_CONVERTER[self.cards[index_list[i + 1]].get_rank()]
                    if rank1 + 1 != rank2:
                        meld_failed = True
                    i += 1
                if meld_failed:
                    for i in index_list:
                        self.cards[i].set_meld_num(-1)
            
            # set meld_status for each card in self.cards to calculate deadwood value for
            # current combo
            for card in self.cards:
                if card.get_meld_num() == -1:
                    card.set_meld_status_false()
                elif meld_num_freq[card.get_meld_num()] < 3: # failed same-rank melds
                    card.set_meld_num(-1)
                    card.set_meld_status_false()
                else:
                    card.set_meld_status_true()
                
            current_hand_val = self.calc_deadwood_value_for_unsorted()

            if current_hand_val < min_deadwood_val: # a better combo than the current meld combo
                # update current best meld combo
                min_deadwood_val = current_hand_val
                best_meld_index_list = []
                for i in range(meld_num):
                    if meld_num_freq[i] >= 3:
                        best_meld_index_list.append(i)
                card_meld_num_list = []
                for i in range(len(self.cards)):
                    card_meld_num_list.append(self.cards[i].get_meld_num())
            
            # backtrack the changed meld_num (now -1) of cards in the failed same-suit melds
            for card in self.cards:
                if len(card.get_meld()) == 1:
                    card.set_meld_num(card.get_meld()[0])                    
            return
        
        if self.cards[index].get_meld() == []: # the card cannot be in a meld whatsoever
            self.cards[index].set_meld_num(-1)
            self.find_best_meld_combo(index + 1)
            return
        
        if len(self.cards[index].get_meld()) == 1: # the card only belongs to one meld
            x = self.cards[index].get_meld()[0]
            self.cards[index].set_meld_num(x)
            meld_num_freq.insert(x, meld_num_freq.pop(x) + 1)
            self.find_best_meld_combo(index + 1)
            meld_num_freq.insert(x, meld_num_freq.pop(x) - 1) # backtracking
            return
        
        if len(self.cards[index].get_meld()) == 2: # the card can be present in either melds
                                                   # (either a same-rank or a same-suit meld)
            x = self.cards[index].get_meld()[0]
            self.cards[index].set_meld_num(x)
            meld_num_freq.insert(x, meld_num_freq.pop(x) + 1)
            self.find_best_meld_combo(index + 1)
            meld_num_freq.insert(x, meld_num_freq.pop(x) - 1) # backtracking
            
            x = self.cards[index].get_meld()[1]
            self.cards[index].set_meld_num(x)
            meld_num_freq.insert(x, meld_num_freq.pop(x) + 1)
            self.find_best_meld_combo(index + 1)
            meld_num_freq.insert(x, meld_num_freq.pop(x) - 1) # backtracking
            return
    
    # sort the hand with melds first and then deadwoods sorted by ranks and then suits
    def sort(self):
        global meld_num, same_rank_meld_num, meld_num_freq, min_deadwood_val
        global best_meld_index_list, card_meld_num_list, card_popped
        
        # initialization
        card_popped = False # popped card comes back when "sort" is hit
        for card in self.cards:
            card.clear_previous_melds()
            card.initialize_pop()
     
        # sort self.cards by ranks then suits
        self.sort_by_rank(0, len(self.cards))
        
        # detect same-rank sequences and add the meld number to each card in the sequence
        # ex: if the hand is Heart A, Diamond A, Spade A, Heart 2, Diamond 3, Club 3, Spade 3...
        # then Heart A, Diamond A and Spade A belong to meld #0 and Diamond 3, Club 3, Spade 3 belong to meld #1
        # 0's are added to Heart A, Diamond A and Spade A's meld lists, and 1's are added to Diamond 3, Club 3 and
        # Spade 3's meld lists
        meld_num = 0
        i = 0
        while i < len(self.cards):
            j = i + 1
            while j < len(self.cards) and self.cards[i].get_rank() == self.cards[j].get_rank():
                j += 1
            if i + 2 < j:
                while i < j:
                    self.cards[i].add_meld_num(meld_num)
                    i += 1
                meld_num += 1
            else:
                i = j
        same_rank_meld_num = meld_num
        
        # sort self.cards_sorted_by_suit by suits then ranks
        self.cards_sorted_by_suit = []
        for card in self.cards:
            self.cards_sorted_by_suit.append(card)
        self.cards_suit_index = []
        for i in range(len(self.cards)):
            self.cards_suit_index.append(i)
        self.sort_by_suit()
        
        # detect same-suits sequences and add the meld number to each card in the sequence
        # ex: if the hand is Heart A, Heart 2, Heart 3, Diamond 3, Diamond 4, Diamond 5...
        # then Heart A, Heart 2, Heart 3 belong to meld # 3 and Diamond 3, Diamond 4, Diamond 5 belong to meld #4
        # 3's are added to Heart A, Heart B and Heart 3's meld lists, and 4's are added to Diamond 3, Diamond 4 and
        # Diamond 5's meld lists      
        i = 0
        while i < len(self.cards_sorted_by_suit):
            j = i + 1
            in_sequence = True
            while j < len(self.cards_sorted_by_suit) and in_sequence:
                cond1 = self.cards_sorted_by_suit[i].get_suit() == self.cards_sorted_by_suit[j].get_suit()
                cond2 = RANKS_CONVERTER[self.cards_sorted_by_suit[j - 1].get_rank()] + 1 == RANKS_CONVERTER[self.cards_sorted_by_suit[j].get_rank()]
                if cond1 and cond2:
                    j += 1
                else:
                    in_sequence = False
            if i + 2 < j:
                while i < j:
                    self.cards[self.cards_suit_index[i]].add_meld_num(meld_num)
                    i += 1
                meld_num += 1
            else:
                i = j
        
        # initialize meld_num_freq, min_deadwood_val, min_meld_num_list and card_meld_num_list
        # call a recursive function self.find_best_meld_combo(index) to find out a best
        # combination of melds with the smallest deadwood value
        meld_num_freq = [] # meld_num_freq[i] indicates how many cards choose to stay in 
                           # meld #i (helps detect failed same-rank melds)
        for i in range(meld_num):
            meld_num_freq.append(0)
        min_deadwood_val = 1000 # initialize the min_dead_wood_val with a large value
        best_meld_index_list = [] # stores the meld #'s in the best combo
        card_meld_num_list = [] # records the meld # each card is in in the best meld combo
        
        self.find_best_meld_combo(0)
        # update the best meld #'s in self.cards
        for i in range(len(self.cards)):
            self.cards[i].set_meld_num(card_meld_num_list[i])
        
        # self.melds stores the cards in the melds and self.deadwood stores the deadwood cards
        # update self.cards by merging self.melds and self.deadwood together
        self.melds = []
        for num in best_meld_index_list:
            for i in range(len(card_meld_num_list)):
                if card_meld_num_list[i] == num:
                    self.melds.append(self.cards[i])
        self.deadwood = []
        for i in range(len(card_meld_num_list)):
            if card_meld_num_list[i] == -1:
                self.deadwood.append(self.cards[i])
        self.cards = self.melds + self.deadwood
    
    # check if there are cards that can be laid off from hand to self
    def check_if_laid_off(self, hand):
        global meld_num, lay_off_message_display
        
        i = 0
        while i < len(self.melds):
            j = i + 1
            while j < len(self.melds) and self.melds[i].get_meld_num() == self.melds[j].get_meld_num():
                j += 1
            if i < len(self.melds) - 1:
                if self.melds[i].get_rank() == self.melds[i + 1].get_rank(): # same-rank
                    for card in hand.get_deadwood():
                        if self.melds[i].get_rank() == card.get_rank():
                            hand.change_lay_off_meld_num(hand.find_index(card), self.cards[i].get_meld_num())
                            lay_off_message_display = True
                else:
                    current_suit = self.melds[i].get_suit()
                    head_rank = RANKS_CONVERTER[self.melds[i].get_rank()]
                    tail_rank = RANKS_CONVERTER[self.melds[j - 1].get_rank()]
                    for index in range(len(hand.get_deadwood())):
                        index2 = len(hand.get_deadwood()) - index - 1
                        if hand.get_deadwood()[index].get_suit() == current_suit: # same-suit
                            if RANKS_CONVERTER[hand.get_deadwood()[index].get_rank()] == tail_rank + 1:
                                tail_rank += 1
                                hand.change_lay_off_meld_num(index + len(hand.get_melds()), self.cards[i].get_meld_num())
                                lay_off_message_display = True
                        if hand.get_deadwood()[index2].get_suit() == current_suit:
                            if RANKS_CONVERTER[hand.get_deadwood()[index2].get_rank()] == head_rank - 1:
                                head_rank -= 1
                                hand.change_lay_off_meld_num(index2 + len(hand.get_melds()), self.cards[i].get_meld_num())
                                lay_off_message_display = True
            i = j
    
    # lay off the cards according to their lay_off_meld_num
    def lay_off(self, receiver_hand):
        for i in range(len(self.cards) - 1, len(self.melds) - 1, -1):
            if self.cards[i].get_lay_off_meld_num() != -1:
                head = 0
                while receiver_hand.get_card(head).get_meld_num() != self.cards[i].get_lay_off_meld_num():
                    head += 1
                tail = head
                while receiver_hand.get_card(tail).get_meld_num() == self.cards[i].get_lay_off_meld_num():
                    tail += 1
                # insert the card into the meld in receiver_hand that has the same lay_off_meld_num
                receiver_hand.insert_card(tail, self.discard(i))
                # sort the specific meld in receiver_hand by rank then suit
                receiver_hand.sort_by_rank(head, tail + 1)

        self.sort() # update itself to calc the new deadwood value
    
    def get_melds(self):
        return self.melds
    
    def get_deadwood(self):
        return self.deadwood
    
    def get_card(self, index):
        return self.cards[index]
    
    def get_cards(self):
        return self.cards
