import { Link } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import React, { Children, useRef, useState } from 'react';
// import useThemedTextStyle from '@site/src/hooks/useThemedTextStyle';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    display: 'flex',
    // backgroundColor: '#e0cb6eff',
    width: 300,
    height: 300,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 30,
    padding: 20,
  },
  square: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    backgroundColor: '#f8f9ff',
    borderRadius: 20,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  listWrapper: {
    borderRadius: 16,
    backgroundColor: '#f8f9ff',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    padding: 8,
    paddingHorizontal: 32,
  },
});

const SECTION_HEIGHT = 350;

const BRAND_COLORS = ['#fa7f7c', '#b58df1', '#ffe780', '#82cab2'];

const SECTIONS = [
  {
    name: 'Wordle',
    content: (
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require('../assets/wordle logo.png')}
        />
      </View>
    ),
    path: 'games/wordle'
  },
  {
    name: 'TicTacToe',
    content: (
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require('../assets/tictactoe-icon.png')}
        />
      </View>
    ),
    path: 'games/tic'
  },
  {
    name: 'Statistics',
    content: (
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require('../assets/graph-icon.png')}
        />
      </View>
    ),
    path: 'test'
  },{
    name: 'Chimp Game',
    content: (
      <View style={styles.container}>
        <Image
          style={styles.imageContainer}
          source={require('../assets/graph-icon.png')}
        />
      </View>
    ),
    path: 'games/chimpGame'
  },
];

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const useSelectedStyle = (selectedItem, item, borderColor) =>
  useAnimatedStyle(() => ({
    fontWeight: selectedItem.value === item ? '600' : '400',
    borderBottomWidth: selectedItem.value === item ? 1 : 0,
    borderBottomColor: selectedItem.value === item ? borderColor : 'transparent',
  }));

const TableOfContentsElement = ({
  item,
  index,
  visibleIndex,
  sectionCardsRef,
}) => {
  const textColor = '#000000';
  const borderColor = textColor.color
  const style = useSelectedStyle(visibleIndex, index, borderColor);


  return (
    <Pressable
      onPress={() => {
        sectionCardsRef.current?.scrollToIndex({ index, animated: true });
        visibleIndex.value = index;
      }}
      style={[sectionListStyles.tableOfContentsElement]}>
      <Animated.Text
        style={[
          style,
          sectionListStyles.tableOfContentsElement,
          textColor,
        ]}>
        {item}
      </Animated.Text>
    </Pressable>
  );
};

const TableOfContents = ({
  data,
  visibleIndex,
  sectionCardsRef,
  tableOfContentsRef,
}) => {
  return (
    <View style={sectionListStyles.tableOfContents}>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TableOfContentsElement
            item={item}
            visibleIndex={visibleIndex}
            index={index}
            sectionCardsRef={sectionCardsRef}
          />
        )}
        data={data}
        estimatedItemSize={52}
        ref={tableOfContentsRef}
      />
    </View>
  );
};

const SectionList = () => {
  const selectedItem = useSharedValue('');
  const visibleIndex = useSharedValue(0);
  const sectionNames = SECTIONS.map((s) => s.name);
  const sectionCardsRef = useRef(null);
  const tableOfContentsRef = useRef(null);

  return (
    <SafeAreaView style={sectionListStyles.cardsContainer}>
      <TableOfContents
        data={sectionNames}
        visibleIndex={visibleIndex}
        sectionCardsRef={sectionCardsRef}
        tableOfContentsRef={tableOfContentsRef}
      />
      <SectionCards
        sections={SECTIONS}
        visibleIndex={visibleIndex}
        tableOfContentsRef={tableOfContentsRef}
        sectionCardsRef={sectionCardsRef}
      />
    </SafeAreaView>
  );
};

const sectionListStyles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 600,
  },
  flex: {
    flex: 1,
  },
  tableOfContentsElement: {
    padding: 4,
    marginHorizontal: 4,
    margin: 8,
    overflow: 'hidden',
  },
  tableOfContents: {
    top: 0,
  },
});

const SectionCards = ({
  sections,
  visibleIndex,
  sectionCardsRef,
  tableOfContentsRef,
}) => {
  const textColor = '#000000';
  const heights = sections.map((_) => SECTION_HEIGHT);

  const getOffsetStarts = () =>
    heights.map((v, i) => heights.slice(0, i).reduce((x, acc) => x + acc, 0));

  const onScroll = (event) => {
    // Extract the needed value immediately
    const offset = event.nativeEvent?.contentOffset?.y;

    if (offset !== undefined) {
      const distancesFromTop = getOffsetStarts().map((v) =>
        Math.abs(v - offset)
      );
      const newIndex = distancesFromTop.indexOf(
        Math.min.apply(null, distancesFromTop)
      );
      if (visibleIndex.value !== newIndex) {
        tableOfContentsRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }
      visibleIndex.value = newIndex;
    }
  };

  // Create a debounced version of the function that only accepts the offset value to stop warning
  const debouncedOnScroll = debounce((offset) => {
      if (offset !== undefined) {
          const distancesFromTop = getOffsetStarts().map((v) =>
              Math.abs(v - offset)
          );
          const newIndex = distancesFromTop.indexOf(
              Math.min.apply(null, distancesFromTop)
          );
          if (visibleIndex.value !== newIndex) {
              tableOfContentsRef.current?.scrollToIndex({
                  index: newIndex,
                  animated: true,
              });
          }
          visibleIndex.value = newIndex;
      }
  });

  const renderItem = ({ item }) => {
    return (
      <View>
        <Animated.Text style={[sectionCardStyles.header, textColor]}>
          {item.name}
        </Animated.Text>
        <SectionCardsElement name={item.name} path={item.path}>
          <Text style={sectionCardStyles.content}>{item.content}</Text>
        </SectionCardsElement>
      </View>
    );
  };

  return (
    <View style={sectionListStyles.flex}>
      <FlashList
        ref={sectionCardsRef}
        estimatedItemSize={52}
        estimatedFirstItemOffset={0}
        renderItem={renderItem}
        data={sections}
        extraData={textColor}
        onScrollBeginDrag={onScroll} // Use original onScroll for immediate events
        onScrollEndDrag={onScroll} // Use original onScroll for immediate events
        // Pass only the data needed (the offset) to the debounced function
        onScroll={(event) => debouncedOnScroll(event.nativeEvent?.contentOffset?.y)}
        onMomentumScrollBegin={onScroll} // Use original onScroll for immediate events
        onMomentumScrollEnd={onScroll} // Use original onScroll for immediate events
      />
    </View>
  );
};

const getRandomBrandColor = () => {
  const colorIndex = Math.floor(Math.random() * BRAND_COLORS.length);
  return BRAND_COLORS[colorIndex];
};

const SectionCardsElement = ({ children, name, path }) => {
  const [backgroundColor, setBackgroundColor] = useState(getRandomBrandColor());
  return (
    <View style={[sectionCardStyles.container, { backgroundColor }]}>
      {children}
      <Link
        style={sectionCardStyles.button}
        href={path}
        // onPress={() => setBackgroundColor(getRandomBrandColor())}
        >
        <Text style={sectionCardStyles.buttonText}>
          Go to {name}
        </Text>
      </Link>
    </View>
  );
};

const sectionCardStyles = StyleSheet.create({
  container: {
    height: SECTION_HEIGHT,
    margin: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 24,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    color: '#a9b6e2ff',
  },
  button: {
    backgroundColor: '#f8f9ff',
    padding: 12,
    borderRadius: 48,
  },
  buttonText: {
    color: '#001a72',
    fontFamily: '',
    padding: '0.5rem',
  },
});

export default SectionList;
